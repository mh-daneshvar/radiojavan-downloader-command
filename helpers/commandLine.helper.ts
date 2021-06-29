import readline      from 'readline'
import PrinterHelper from './printer.helper'

export default class CommandLineHelper {

  private readonly readLine: any

  /**
   *
   */
  constructor() {
    this.readLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }


  /**
   *
   */
  async askTheUrl(): Promise<string | null> {
    const url = await this.getAsyncReadline(PrinterHelper.askTheUrl());
    this.readLine.close()
    if (url && url.length) {
      return url.replace(/\\/g, '')
    }
    return null
  }

  /**
   *
   * @param question
   * @private
   */
  private async getAsyncReadline(question: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.readLine.question(question, (input: string) => resolve(input));
    });
  }

}
