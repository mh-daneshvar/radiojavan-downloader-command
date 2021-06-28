import yargs from 'yargs';

export default class CommandLineHelper {
  static getCommands(): any {
    return yargs.options({
      'url': { type: 'string', demandOption: true, alias: 'u' }
    }).argv;
  }
}
