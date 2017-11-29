// @flow

import type {TemplateHookArgsType} from 'create-any-cli/dist/types.js';

const path = require('path');
const ora = require('ora');
const create = require('create-any-cli');
const Command = require('./../lib/command.js');
const file = require('./../lib/file.js');

class CreateReactMicroService extends Command {
  /**
   * Executes the creation workflow of `create-react-microservice`.
   *
   * @return {Promise} The Promise that resolves once everything was setup correctly.
   */
  async exec() {
    const dist = await this.resolveDistFolder();
    const name = await this.resolveAppName();
    const scaffoldPackagePath = path.resolve('node_modules', 'create-react-microservice-scaffold');
    const scaffoldPackageJson = file.require(path.join(scaffoldPackagePath, 'package.json'));
    const src = path.join(scaffoldPackagePath, scaffoldPackageJson.main);

    this.log('start', 'Creating', name, 'in', dist);
    this.suspendLogging();

    const args = await this.resolveAndPromptTemplateArgs();

    await create.processTemplateAndCreate({
      dist,
      template: {
        src,
        args,
        filePatterns: ['**/*']
      },
      hooks: {
        onFile: this.onFile,
        onInvalidDistDir: this.onInvalidDistDir,
        onBeforeReadFile: this.onBeforeReadFile,
        onBeforeProcessFile: this.onBeforeProcessFile,
        onBeforeWriteFile: this.onBeforeWriteFile,
        onAfterWriteFile: this.onAfterWriteFile
      }
    });

    this.log('succeed', 'Successfully created the scaffold in', dist);
    this.log('start', 'Installing all dependencies and bootstrapping the application.');

    try {
      await Command.exec('yarn', ['install'], {
        cwd: dist
      });

      await Command.exec('yarn', ['run', 'bootstrap'], {
        cwd: dist
      });
    } catch (e) {
      this.fail(e);
    }

    this.log('succeed', 'Successfully bootstrapped the application in', dist);
  };

  /**
   * Resolves the target folder for the scaffold. The user can add a folder name himself via the CLI.
   *
   * @return {Promise} The Promise that resolves with the full path of the target folder.
   */
  async resolveDistFolder() {
    return path.join(process.cwd(), this.input.join(' '));
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
    const answers = await create.resolveAndPromptOptions([{
      type: 'list',
      name: 'license',
      message: 'What is the preffered license of your application?',
      choices: ['Unlicense', 'Apache-2.0', 'MIT', 'other']
    }, {
      type: 'input',
      name: 'npmScope',
      message: 'What is the NPM organization scope for the React Component? (Optional)',
      filter: this.filterNpmScopeArg
    }], this.flags);
    const args = await create.createDecoratedTemplateArgs({name, ...answers});

    return args;
  }

  filterNpmScopeArg = (str?: string) => {
    if (str && str.length) {
      return `@${str.replace(/\W/g, '')}/`
    }

    return '';
  }

  onFile = () => {
    return {
      spinner: ora()
    };
  };

  onInvalidDistDir = async (dist: string) => {
    this.fail('Target directory', dist, 'is not empty. Aborting the creation of the application.')
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
