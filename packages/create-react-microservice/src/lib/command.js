// @flow

const exec = require('execa');
const chalk = require('chalk');
const ora = require('ora');
const npm = require('./npm.js');

class Command {
  static exec = exec;

  pkg: Object;
  input: Array<string>;
  flags: {[string]: mixed};
  spinner = ora();

  constructor(args: {
    input: Array<string>,
    flags: {[string]: mixed},
    pkg: Object
  }) {
    this.pkg = args.pkg;
    this.input = args.input;
    this.flags = args.flags;
  }

  /**
   * Validates the global CLI installation so we can be sure that the newest version is always installed.
   *
   * @return {Promise} The Promise that resolves if everything is installed properly / rejects if something is wrong.
   */
  async validateInstallation() {
    const {name, version} = this.pkg;
    const latestPublishedVersion = await npm.latestVersion(name);

    if (latestPublishedVersion !== version && version !== '0.0.0-development') {
      throw new Error(
        `Oudated version of "${name}" found. Please update your global installation by executing "yarn global upgrade ${name}@${latestPublishedVersion}".`
      );
    }
  }

  /**
   * Logs a message to the users console.
   *
   * @param  {String}       severity The severity of the message to log.
   * @param  {Array<mixed>} args     The arguments to log.
   * @return {void}
   */
  log(
    severity: 'start' | 'succeed' | 'fail' | 'warn' | 'info',
    ...args: Array<string>
  ): void {
    this.spinner[severity](this.createLogMsg(...args));
  }

  /**
   * Creates a log message prefixed with the package name and different colors depending on the position of the log argument.
   *
   * @return {String}
   */
  createLogMsg(
    a: string,
    b?: string,
    c?: string,
    ...args: Array<string>
  ): string {
    return [
      chalk.bold.white(`create-react-microservice » ${a}`),
      b ? chalk.bold.dim(`» ${b}`) : null,
      c ? chalk.bold.white(`» ${c}`) : null,
      ...args
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Log a failure to the users console and exit the process with an error code.
   *
   * @param  {Array<mixed>} args     The arguments to log.
   * @return {void}
   */
  fail(...args: Array<string>): void {
    this.log('fail', ...args);
    process.exit(1);
  }

  /**
   * Suspends the logging of the spinner.
   *
   * @return {void}
   */
  suspendLogging() {
    this.spinner.stopAndPersist();
  }
}

module.exports = Command;
