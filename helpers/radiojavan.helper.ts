import axios from 'axios';

enum MEDIA_TYPES {
  MP3 = 'mp3',
  PODCAST = 'podcast',
}

export default class RadioJavanHelper {
  private readonly url: string = ''

  /**
   * Constructor
   *
   * @param url
   */
  constructor(url: string) {
    // Sanitize the given url
    this.url = url.split('?')[0]
  }

  /**
   * Extract type from the given url
   */
  extractType() {
    const url = this.url
    if (url.includes('mp3s/mp3')) {
      return MEDIA_TYPES.MP3
    } else if (url.includes('podcasts/podcast')) {
      return MEDIA_TYPES.PODCAST
    } else {
      throw new Error('Oh man! We still don\'t support this type')
    }
  }

  /**
   * Extract perm from the given url
   * Example of output: Mr-Kiarash-Esmeto-Daad-Mizanam
   *
   */
  extractPerm(): string {
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
    if (type === MEDIA_TYPES.MP3) {
      return `mp3/mp3-312/${ this.extractPerm() }.mp3`
    } else if (type === MEDIA_TYPES.PODCAST) {
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
    if (type === MEDIA_TYPES.MP3) {
      apiAddress = 'https://www.radiojavan.com/mp3s/mp3_host'
    } else if (type === MEDIA_TYPES.PODCAST) {
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
   */
  async getDownloadUrl() {
    const hostAddress = await this.getHost()
    const currentMP3Url = this.extractCurrentMP3Url()
    return `${ hostAddress }/media/${ currentMP3Url }`
  }
}
