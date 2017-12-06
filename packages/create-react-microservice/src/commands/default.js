// @flow

import type {
  TemplateHookArgsType,
  TemplateArgsType
} from 'create-any-cli/dist/types.js';

const path = require('path');
const ora = require('ora');
const emoji = require('node-emoji');
const chalk = require('chalk');
const lodash = require('lodash');
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
    if (this.flags.help || this.flags.h) {
      return this.printHelp();
    }

    const name = await this.resolveAppName();
    const src = await this.resolveScaffold();
    const dist = await this.resolveDistFolder();

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
    this.log(
      'start',
      'Installing all dependencies (this might take a while)...'
    );

    try {
      await Command.exec('yarn', ['install'], {
        cwd: dist
      });

      await this.setupGitRepository(args.gitRepoUrl.raw);

      this.log('succeed', 'Successfully installed all dependencies');

      this.log(
        'start',
        'Bootstrapping the service (this might take a while)...'
      );
      await Command.exec('yarn', ['run', 'bootstrap'], {
        cwd: dist
      });
      this.log('succeed', 'Successfully bootstrapped the service');
    } catch (e) {
      this.fail(e);
    }

    this.log('succeed', 'Done!');
    this.printStartInstructions(dist);
  }

  /**
   * Resolves the scaffolds src folder path.
   *
   * @return {Promise} The Promise that resolves with the full path pointing to the scaffolds src folder.
   */
  async resolveScaffold() {
    const modulesPath = file
      .findNodeModules({cwd: __dirname})
      .map(modulesPath => path.join(__dirname, modulesPath))
      .find(modulesPath =>
        file.existsSync(
          path.join(modulesPath, 'create-react-microservice-scaffold')
        )
      );
    const scaffoldPackagePath = path.join(
      modulesPath,
      'create-react-microservice-scaffold'
    );
    const scaffoldPackageJson = file.require(
      'create-react-microservice-scaffold/package.json'
    );
    const src = trim.right(
      path.join(scaffoldPackagePath, scaffoldPackageJson.main),
      '/'
    );

    return src;
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
   * Returns the list of questions prompted to inquirer.js if not provided via CLI flags.
   *
   * @return {Array} The list of inquirer questions.
   */
  getInquirerQuestions() {
    return [
      {
        type: 'list',
        name: 'license',
        message:
          'What is the preffered license for the mono repository and its packages?',
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
    ];
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
      this.getInquirerQuestions(),
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

      before = new RegExp(before, 'g');

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
   * Pretty prints the help instructions of the CLI.
   *
   * @return {void}
   */
  printHelp() {
    const questions = this.getInquirerQuestions();
    const padding =
      questions.reduce((padding, question) => {
        const questionPadding = question.name.length;
        return questionPadding > padding ? questionPadding : padding;
      }, 0) + 1;

    console.log(
      `
${this.pkg.description}

Usage:
$ create-react-microservice [name] <...options>

Options:
${questions
        .map(question => {
          const {name, message} = question;

          return `  --${lodash.padEnd(name, padding)} ${message}`;
        })
        .join('\n')}
    `.trim()
    );
  }

  /**
   * Pretty prints start instructions of the created service.
   *
   * @param  {String} dist The target directory of the created service.
   * @return {void}
   */
  printStartInstructions(dist: string) {
    const separator = `
=====================================================================================
`;
    const log = `
${separator}
${emoji.get('rocket')}  ${chalk.bold(
      'We have lift off! Your service is ready to be developed / started.'
    )}

${chalk.bold('First of all, change into the direcotry, e.g.:')}
${chalk.bgGreenBright.black(`cd ${dist}`)}

${chalk.bold('Starting the development server:')}
${chalk.bgGreenBright.black('yarn run dev')}

${chalk.bold('Starting the production server:')}
${chalk.bgGreenBright.black('yarn run start')}

${chalk.bold('Building for production:')}
${chalk.bgGreenBright.black('yarn run build')}

${chalk.bold('Docs/help is available at')} ${chalk.cyan.underline(
      'https://github.com/ImmoweltGroup/create-react-microservice'
    )}
${chalk.bold('Dont forget to')} ${emoji.get('star')}  ${chalk.bold(
      'us on GitHub!'
    )}
${chalk.cyan.underline(
      'https://github.com/ImmoweltGroup/create-react-microservice'
    )}
${separator}
  `.trim();

    console.log(chalk.white(log));
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
