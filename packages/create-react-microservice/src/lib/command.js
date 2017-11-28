// @flow

const exec = require('execa');
const chalk = require('chalk');
const ora = require('ora');

class Command {
  static exec = exec;

  input: Array<string>
  flags: {[string]: mixed}
  spinner = ora()

  constructor(args: {input: Array<string>, flags: {[string]: mixed}}) {
    this.input = args.input;
    this.flags = args.flags;
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
  createLogMsg(a: string, b?: string, c?: string, ...args: Array<string>): string {
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
