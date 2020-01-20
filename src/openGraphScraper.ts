
import charset from './charset'
import cheerio from 'cheerio'
import fields from './fields'
import iconv from 'iconv-lite'
import chardet from 'chardet'
import * as media from './media'
import request from 'request-promise-native'
import url from 'url'
import * as utils from './utils'
import { OGOptions, OGData, OGDataRaw, OGImage } from './types'
import OGError from './error'

/*
 * run
 * @param string options - options the user has set
 * @param function callback and promise
 */
export default setOptionsAndReturnOpenGraphResults

/*
 * set options and return open graph results
 * @param string options - options the user has set
 * @param function callback
 */
async function setOptionsAndReturnOpenGraphResults(_optionsOrUrl: OGOptions | string): Promise<OGData> {
  let options: OGOptions
  if (typeof _optionsOrUrl === 'string') {
    options = {
      url: _optionsOrUrl,
      resolveWithFullResponse: true,
    }
  }
  else {
    options = {
      ... _optionsOrUrl,
      resolveWithFullResponse: true,
    }
  }
  if (options.html) {
    if (options.url) {
      throw new OGError('Must specify either `url` or `html`, not both')
    }
    return extractMetaTags(options.html, options)
  }

  const validate = utils.validate(options.url!, options.timeout)

  if (validate.returnInputUrl) {
    options.url = validate.returnInputUrl
    options.timeout = validate.returnInputTimeout
    options.headers = {
      // 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      ... options.headers,
    }

    options.gzip = true
    options.encoding = options.encoding || undefined
    options.jar = options.jar || false
    options.followAllRedirects = options.followAllRedirects || true
    options.maxRedirects = options.maxRedirects || 20

    // tslint:disable-next-line
    if ('window' in global && typeof global['window'] !== 'undefined') {
      options.gzip = false
      options.protocol = url.parse(options.url).protocol
    }

    // see if site is black listed
    if (options.blacklist && options.blacklist.length > 0) {
      options.blacklist.forEach((site) => {
        const siteUrl = url.parse(site)
        const requestUrl = url.parse(options.url!)
        if (site === options.url || (
          siteUrl.protocol === requestUrl.protocol &&
          siteUrl.hostname === requestUrl.hostname &&
          siteUrl.port === requestUrl.port && (
            !requestUrl.pathname ||
            requestUrl.pathname?.startsWith(siteUrl.pathname || '')
          )
        )) {
          throw new OGError('Host Name Has Been Black Listed')
        }
      })
    }

    try {
      const results = await requestAndResultsFormatter(options)
      if (results) {
        return results
      }
    }
    catch (error) {
      if (error && (error.code === 'ENOTFOUND' || error.code === 'EHOSTUNREACH')) {
        throw new OGError('Page Not Found', error)
      }
      else if (error && error.code === 'ETIMEDOUT') {
        throw new OGError('Time Out', error)
      }
      else {
        throw new OGError('Time Out', error)
      }
    }
  }
  throw new OGError('Invalid URL')
}

/*
 * request and results formatter
 * @param string options - options the user has set
 * @param function callback
 */
async function requestAndResultsFormatter(_options: OGOptions) {
  const options = {url: '', ... _options}
  const peekSize = options.peekSize || 1024
  if (!options.url) {
    throw new OGError('You must provide either options.url or options.html')
  }

  try {
    const response: request.FullResponse  = await request(options)
    const body = response.body
    let formatBody = body
    if (response && response.statusCode &&
      (response.statusCode >= 400 && response.statusCode < 600)) {
      throw new OGError('Server Has Ran Into A Error', null, response)
    }
    if (!options.encoding) {
      const char = charset(response.headers, formatBody, peekSize) || chardet.detect(formatBody)
      if (char) {
        try {
          formatBody = iconv.decode(Buffer.from(formatBody), char)
        } catch (ex) {
          throw new OGError(undefined, ex, response)
        }
      } else {
        formatBody = formatBody.toString()
      }
    }
    const ogObject = {
      ... extractMetaTags(formatBody, options),
      response,
    }
    if (options.withCharset) {
      ogObject.charset = charset(response.headers, formatBody, peekSize)
    }
    return ogObject
  }
  catch (e) {
    throw new OGError(undefined, e)
  }
}

/*
 * extract meta tags from html string
 * @param string body - html string
 * @param string options - options the user has set
 */
function extractMetaTags(body: string | Buffer, options: OGOptions) {
  const $ = cheerio.load(body)
  const validFieldNames = fields.map((x) => x.property)
  const meta = $('meta').toArray().filter((x) => validFieldNames.some((y) => y === x.attribs.property))
  // console.log(meta)

  let ogObjectRaw: OGDataRaw = meta.reduce((acc, element) => {
    // console.log({element})
    const property = element.attribs.property ?? element.attribs.name ??
      element.attribs['http-equiv'] ?? element.attribs.httpEquiv
    const item = property && fields.find((x) => x.property === property)
    if (!item) {
      return acc
    }
    const content = element.attribs.content ?? element.attribs.value
    let currentValue = acc[item.fieldName]
    if (item.multiple) {
      if (!currentValue) currentValue = [content]
      else currentValue = [... currentValue as string[], content]
    }
    else {
      currentValue = currentValue ?? content
    }
    const out = {
      ... acc,
      [item.fieldName]: currentValue,
    }
    // console.log(out)
    return out
  }, {} as OGDataRaw)

  // console.log({ogObjectRaw})

  // set the ogImage or fallback to ogImageURL or ogImageSecureURL
  if (!ogObjectRaw.ogImage) {
    ogObjectRaw.ogImage = ogObjectRaw.ogImageURL ?
      ogObjectRaw.ogImageURL :
      ogObjectRaw.ogImageSecureURL ?
        ogObjectRaw.ogImageSecureURL :
        []
  }
  if (!ogObjectRaw.ogImage || !ogObjectRaw.ogImage.length) {
    delete ogObjectRaw.ogImage
  }

  // sets up all the media stuff
  const ogObject: OGData = media.mediaSetup(ogObjectRaw, options)

  // Check for 'only get open graph info'
  if (!options.onlyGetOpenGraphInfo) {
    // Get title tag if og title was not provided
    if (!ogObject.ogTitle && $('head > title').text() && $('head > title').text().length > 0) {
      ogObject.ogTitle = $('head > title').text()
    }
    // Get meta description tag if og description was not provided
    if (!ogObject.ogDescription
      && $('head > meta[name="description"]').attr('content')
      && $('head > meta[name="description"]')?.attr('content')?.length! > 0) {
      ogObject.ogDescription = $('head > meta[name="description"]').attr('content')
    }
    // Get first image as og:image if there is no og:image tag.
    // eslint-disable-next-line no-undefined
    const ogImageFallback = options.ogImageFallback === undefined ? true : options.ogImageFallback
    if (!ogObject.ogImage && ogImageFallback) {
      ogObject.ogImage = []
      const supportedImageExts = ['jpg', 'jpeg', 'png']
      $('img').toArray().forEach((elem) => {
        const src = elem.attribs.src || ''
        const type = supportedImageExts.find((x) => x === src.split('.').pop())
        if (type) {
          (ogObject.ogImage! as OGImage[]).push({
            url: src,
            width: parseInt(elem.attribs.width, 10),
            height: parseInt(elem.attribs.height, 10),
            type: `image/${type}`,
          })
        }
      })
    }
  }

  // remove ogObject.ogImage is there is nothing found
  if (Array.isArray(ogObject.ogImage) && !ogObject.ogImage.length) {
    delete ogObject.ogImage
  }

  return ogObject
}