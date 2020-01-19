import {
  OptionsWithUrl,
  FullResponse,
} from 'request-promise-native'
import {
  OGError,
} from './error'

export type IgnoredRequestPromiseProperties =
  'callback' |
  'json' |
  'url'

export type OGOptions = Omit<OptionsWithUrl, IgnoredRequestPromiseProperties> & {
  blacklist?: string[],
  html?: string,
  ogImageFallback?: boolean,
  onlyGetOpenGraphInfo?: boolean,
  peekSize?: number,
  protocol?: string | null,
  withCharset?: boolean,
  url?: string,
}

export type OGResponse = {
  data: OGData,
  requestUrl: string,
  success: true,
}

export type OGMedia = {
  url: string,
  width: number,
  height: number,
}

export type OGVideo = OGMedia & {
  type: string,
}

export type OGImage = OGMedia & {
  type: string,
}

export type OGMusicSong = {
  url: string,
  track: number,
  disc: number,
}

export type OGTwitterImage = OGMedia & {
  alt?: string,
}

export type OGTwitterPlayer = OGMedia & {
  stream?: string,
}

export type OGDataRaw = {
  [key in OGFields]?: string | string[]
} & {
  charset?: string,
}

export type OGData = {
  ogTitle?: string,
  ogType?: string,
  ogUrl?: string,
  ogDescription?: string,
  ogImage?: OGImage[],
  ogVideo?: OGVideo[],
  charset?: string,
  twitterImage?: OGTwitterImage[],
  twitterPlayer?: OGTwitterPlayer[],
  musicSong?: OGMusicSong[],
  response?: FullResponse,
} & Omit<OGDataRaw, 'ogImage' | 'ogVideo' | 'twitterImage' | 'twitterPlayer' | 'musicSong'>

export type OGResult = {
  requestUrl: string,
  response?: FullResponse,
}

export type OGCallback = (
  error?: OGError | null,
  data?: OGData | null,
  response?: FullResponse | null,
) => void

export type OGFields = 'musicAlbum' |
  'musicAlbumDisc' |
  'musicAlbumTrack' |
  'musicCreator' |
  'musicDuration' |
  'musicMusician' |
  'musicReleaseDate' |
  'musicSong' |
  'musicSongDisc' |
  'musicSongTrack' |
  'ogAudio' |
  'ogAudioSecureURL' |
  'ogAudioType' |
  'ogAudioURL' |
  'ogAvailability' |
  'ogDescription' |
  'ogDeterminer' |
  'ogImage' |
  'ogImageHeight' |
  'ogImageSecureURL' |
  'ogImageType' |
  'ogImageURL' |
  'ogImageWidth' |
  'ogLocale' |
  'ogLocaleAlternate' |
  'ogPriceAmount' |
  'ogPriceCurrency' |
  'ogProductAvailability' |
  'ogProductCondition' |
  'ogProductPriceAmount' |
  'ogProductPriceCurrency' |
  'ogProductRetailerItemId' |
  'ogSiteName' |
  'ogTitle' |
  'ogType' |
  'ogUrl' |
  'ogVideo' |
  'ogVideo' |
  'ogVideoHeight' |
  'ogVideoSecureURL' |
  'ogVideoType' |
  'ogVideoWidth' |
  'twitterAppIdGooglePlay' |
  'twitterAppIdiPad' |
  'twitterAppIdiPhone' |
  'twitterAppNameGooglePlay' |
  'twitterAppNameiPad' |
  'twitterAppNameiPhone' |
  'twitterAppUrlGooglePlay' |
  'twitterAppUrliPad' |
  'twitterAppUrliPhone' |
  'twitterCard' |
  'twitterCreator' |
  'twitterCreatorId' |
  'twitterDescription' |
  'twitterImage' |
  'twitterImageAlt' |
  'twitterImageHeight' |
  'twitterImageSrc' |
  'twitterImageWidth' |
  'twitterPlayer' |
  'twitterPlayerHeight' |
  'twitterPlayerStream' |
  'twitterPlayerWidth' |
  'twitterSite' |
  'twitterSiteId' |
  'twitterTitle'