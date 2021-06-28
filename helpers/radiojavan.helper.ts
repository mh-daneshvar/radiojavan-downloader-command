import axios from 'axios';

export default class RadioJavanHelper {
  private readonly url: string = ''

  constructor(url: string) {
    // Sanitize the url
    this.url = url.split('?')[0]
  }

  extractType() {
    const url = this.url
    if (url.includes('mp3s/mp3')) {
      return 'mp3'
    } else if (url.includes('podcasts/podcast')) {
      return 'podcast'
    } else {
      throw new Error('Oh man! We still don\'t support this type')
    }
  }

  /**
   * Example of output:
   * Mr-Kiarash-Esmeto-Daad-Mizanam
   * @returns {*}
   */
  extractPerm() {
    const url = this.url
    const splittedArray = url.split('/')
    if (splittedArray.length) {
      return splittedArray[splittedArray.length - 1]
    }
    throw new Error('Could not extract perm!')
  }

  /**
   *
   * @returns {string}: mp3/mp3-256/Mr-Kiarash-Esmeto-Daad-Mizanam
   */
  extractCurrentMP3Url() {
    const type = this.extractType()
    if (type === 'mp3') {
      return `mp3/mp3-256/${ this.extractPerm() }.mp3`
    } else if (type === 'podcast') {
      // TODO: handle this situation too
    }
    throw new Error('Could not extract currentMP3Url!')
  }

  /**
   *
   * @returns {Promise<string|Element>}
   */
  async getHost() {
    // Find the api-address based on type of url
    let apiAddress = null
    const type = this.extractType()
    if (type === 'mp3') {
      apiAddress = 'https://www.radiojavan.com/mp3s/mp3_host'
    } else if (type === 'podcast') {
      apiAddress = 'https://www.radiojavan.com/podcasts/podcast_host'
    }

    // Config the request
    const config = {
      method: 'post',
      url: apiAddress,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ id: this.extractPerm() })
    };

    // Send the request
    try {
      // @ts-ignore
      const response = await axios(config)
      const result = JSON.parse(JSON.stringify(response.data))
      return result.host
    } catch (error) {
      // TODO: handle this error
    }
  }

  /**
   *
   * @param hostAddress: https://host2.rj-mw1.com
   * @param currentMP3Url: mp3s/mp3/Mehraad-Jam-Didi
   * @returns {Promise<string|Element>}
   */
  async getDownloadUrl() {
    const hostAddress = await this.getHost()
    const currentMP3Url = this.extractCurrentMP3Url()
    return `${ hostAddress }/media/${ currentMP3Url }`
  }
}
