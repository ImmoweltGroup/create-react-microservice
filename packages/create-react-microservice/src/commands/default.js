// @flow

import type {
  TemplateHookArgsType,
  TemplateArgsType
} from 'create-any-cli/dist/types.js';

const path = require('path');
const ora = require('ora');
const create = require('create-any-cli');
const trim = require('trim-character');
const Command = require('./../lib/command.js');
const file = require('./../lib/file.js');

class CreateReactMicroService extends Command {
  /**
   * Executes the creation workflow of `create-react-microservice`.
   *
   * @return {Promise} The Promise that resolves once everything was setup correctly.
   */
  async exec() {
    const name = await this.resolveAppName();
    const scaffoldPackagePath = path.resolve(
      'node_modules',
      'create-react-microservice-scaffold'
    );
    const scaffoldPackageJson = file.require(
      path.join(scaffoldPackagePath, 'package.json')
    );
    const dist = await this.resolveDistFolder();
    const src = trim.right(
      path.join(scaffoldPackagePath, scaffoldPackageJson.main),
      '/'
    );

    this.log('start', 'Creating', name, 'in', dist);

    const args = await this.resolveAndPromptTemplateArgs();

    await create.processTemplateAndCreate({
      dist,
      template: {
        src,
        args,
        filePatterns: ['**/*', '**/.*'],
        ignore: [
          `${src}/{node_modules,dist,flow-typed/npm}/**`,
          `${src}/packages/*/{node_modules,dist,flow-typed/npm}/**`
        ]
      },
      hooks: {
        onFile: this.onFile,
        onTemplate: this.onTemplate,
        onInvalidDistDir: this.onInvalidDistDir,
        onBeforeReadFile: this.onBeforeReadFile,
        onBeforeProcessFile: this.onBeforeProcessFile,
        onBeforeWriteFile: this.onBeforeWriteFile,
        onAfterWriteFile: this.onAfterWriteFile
      }
    });

    this.log('succeed', 'Processed the scaffold into', dist);
    this.log('start', 'Installing all dependencies...');

    try {
      await Command.exec('yarn', ['install'], {
        cwd: dist
      });

      await this.setupGitRepository(args.gitRepoUrl.raw);

      this.log('succeed', 'Successfully installed all dependencies');

      this.log('start', 'Bootstrapping the service...');
      await Command.exec('yarn', ['run', 'bootstrap'], {
        cwd: dist
      });
      this.log('succeed', 'Successfully bootstrapped the service');
    } catch (e) {
      this.fail(e);
    }

    this.log(
      'succeed',
      'Done! :-) Start the development server by executing',
      `cd ${dist} && yarn run dev`
    );
  }

  /**
   * Resolves the target folder for the scaffold. The user can add a folder name himself via the CLI.
   *
   * @return {Promise} The Promise that resolves with the full path of the target folder.
   */
  async resolveDistFolder() {
    const dist = path.join(process.cwd(), this.input.join(' '));

    return trim.right(dist, '/');
  }

  /**
   * Resolves the name of the app to create. It is always the last part of the full path of the target folder,
   * this way we can make sure that the CLI name input is optional.
   *
   * @return {Promise} The Promise that resolves with the name of the app.
   */
  async resolveAppName() {
    const dist = await this.resolveDistFolder();

    return dist.split(path.sep).pop();
  }

  /**
   * Resolves argumetns via the CLI and optionally prompts the user if the argument was not provided via the CLI flags.
   *
   * @return {Promise} The Promise that resolves with the object containing the template arguments.
   */
  async resolveAndPromptTemplateArgs() {
    const name = await this.resolveAppName();

    this.suspendLogging();

    const answers = await create.resolveAndPromptOptions(
      [
        {
          type: 'list',
          name: 'license',
          message: 'What is the preffered license of your application?',
          choices: ['Unlicense', 'Apache-2.0', 'MIT', 'other']
        },
        {
          type: 'input',
          name: 'npmScope',
          message:
            'What is the NPM organization scope for the mono repositories packages?',
          filter: this.safelyCreateNpmScopeArg,
          validate: Boolean
        },
        {
          type: 'input',
          name: 'gitRepoUrl',
          message:
            'What is the git repository URL for the mono repositories packages?',
          validate: Boolean
        }
      ],
      this.flags
    );
    const args = await create.createDecoratedTemplateArgs({name, ...answers});

    return args;
  }

  /**
   * Filters invalid characters from the given string and returns either a NPM namespace or an empty string.
   *
   * @param  {String} str The to be processed string.
   * @return {String}     The NPM scope string or an empty string.
   */
  safelyCreateNpmScopeArg = (str?: string) => {
    if (str && str.length) {
      const namespace = str
        .replace(/\s/g, '-')
        .replace(/[0-9]/g, '')
        .replace(/[^a-zA-Z]g/g, '')
        .toLowerCase();

      return `@${namespace}/`;
    }

    return '';
  };

  /**
   * We use a custom template engine to still be able to develop the scaffold without creating it via the CLI.
   *
   * @param  {String}  str  The string to process.
   * @param  {Object}  args The template arguments.
   * @return {Promise}      The Promise that resolves once the string has been processed.
   */
  onTemplate = async (str: string, args: TemplateArgsType) => {
    let processedString = str;

    [
      // The service name
      ['my-fancy-ui', args.name.kebabCase],

      // The service name for E.g. environment variables
      ['MY_FANCY_UI', args.name.snakeCase.toUpperCase()],

      // The package scope name
      ['@company-scope/', args.npmScope.raw],

      // The package scope name in RegExp patterns
      ['company-scope', args.npmScope.raw.replace('/', '').replace('@', '')],

      // The choosen license
      ['my-chosen-spdx-license', args.license.raw],

      // Git URL.
      ['https://github.com/my-user/my-repo.git', args.gitRepoUrl.raw]
    ].forEach(identifierWithReplacer => {
      let [before, after] = identifierWithReplacer;

      if (typeof before === 'string') {
        before = new RegExp(before, 'g');
      }

      processedString = processedString.replace(before, after);
    });

    return processedString;
  };

  /**
   * We need to install husky separately since it would otherwise conflict
   * with the root husky installation. Adding a "gitDir" option did not
   * work out so we solve it this way.
   *
   * @see https://github.com/typicode/husky/issues/167
   * @param  {String}  repositoryUrl The URL to the git remote repository that will be setup as `origin`.
   * @return {Promise}               The Promise that resolves once the repository was properly setup.
   */
  async setupGitRepository(repositoryUrl: string) {
    const cwd = await this.resolveDistFolder();
    const opts = {cwd};

    await Command.exec('git', ['init'], opts);
    await Command.exec('git', ['remote', 'add', 'origin', repositoryUrl], opts);
    await Command.exec('yarn', ['add', '--dev', '-W', 'husky'], opts);
  }

  /**
   * Creates a context object containing a spinner instance for enhanced feedback in the users console.
   *
   * @return {Object} The files context.
   */
  onFile = () => {
    return {
      spinner: ora()
    };
  };

  /**
   * Fataly exit if the target directory is not empty.
   *
   * @param  {String}  dist The full path to the resolved target directory.
   * @return {Promise}      The Promise that never resolves.
   */
  onInvalidDistDir = async (dist: string) => {
    this.fail(
      'Target directory',
      dist,
      'is not empty. Aborting the creation of the application.'
    );
  };

  onBeforeReadFile = async ({filePaths, context}: TemplateHookArgsType) => {
    context.spinner.start(this.createLogMsg('Reading file', filePaths.dist));
  };

  onBeforeProcessFile = async ({filePaths, context}: TemplateHookArgsType) => {
    context.spinner.start(this.createLogMsg('Processing file', filePaths.dist));
  };

  onBeforeWriteFile = async ({filePaths, context}: TemplateHookArgsType) => {
    context.spinner.start(this.createLogMsg('Writing file', filePaths.dist));
  };

  onAfterWriteFile = async ({filePaths, context}: TemplateHookArgsType) => {
    context.spinner.succeed(this.createLogMsg('Writing file', filePaths.dist));
  };
}

module.exports = CreateReactMicroService;
