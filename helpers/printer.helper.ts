import chalk from 'chalk';
import boxen from 'boxen';

export default class PrinterHelper {
  /**
   *
   */
  static printHeader() {
    console.log(chalk.white.bold('This is a tool for geeks to download from RadioJavan.com!'));
  }

  /**
   *
   * @param url
   */
  static printURL(url: string) {
    const boxenOptions = {
      padding: 2,
      margin: 0,
      borderStyle: boxen.BorderStyle.Round,
      borderColor: '#37e2b1'
    }
    const header = chalk.hex('#8AE8EA').bold(url)
    console.log(boxen(header, boxenOptions));
  }

  /**
   *
   * @param errorMsg
   */
  static printError(errorMsg: string) {
    const boxenOptions = {
      padding: 2,
      margin: 0,
      borderStyle: boxen.BorderStyle.Round,
      borderColor: '#f76b6c'
    }
    const header = chalk.hex('#f76b6c').bold(errorMsg)
    console.log(boxen(header, boxenOptions));
  }
}
