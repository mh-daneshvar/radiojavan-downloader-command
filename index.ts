#!/usr/bin/env node

import RadioJavanHelper  from './helpers/radiojavan.helper';
import PrinterHelper     from './helpers/printer.helper';
import CommandLineHelper from './helpers/commandLine.helper'

/**
 * we have these kind of addresses:
 * - https://www.radiojavan.com/mp3s/mp3/Mr-Kiarash-Esmeto-Daad-Mizanam
 * - https://www.radiojavan.com/mp3s/mp3/Mehraad-Jam-Cappuccino?start=99041&index=2
 * - https://www.radiojavan.com/podcasts/podcast/Didare-Jaan-28
 */
(async () => {
  PrinterHelper.printHeader()
  const args = CommandLineHelper.getCommands()
  let url = args.url
  if (url && url.length) {
    url = url.replace(/\\/g, '')
    const rjDownloader = new RadioJavanHelper(url)
    const downloadAddress = await rjDownloader.getDownloadUrl();
    PrinterHelper.printURL(downloadAddress)
  }else{
    PrinterHelper.printError('The given url is not valid!')
  }
})();
