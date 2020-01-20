import _ from 'lodash'
import fields from './fields'
import {
  OGData,
  OGDataRaw,
  OGImage,
  OGMedia,
  OGMusicSong,
  OGOptions,
  OGVideo,
  OGTwitterPlayer,
  OGTwitterImage,
} from './types'

/*
 * media setup
 * @param string ogObject - return open open graph info
 * @param string options - options the user has set
 * @param function callback
 */
export function mediaSetup(ogObjectRaw: OGDataRaw, options: OGOptions) {
  /* Combine image/width/height/type
    and sort for priority */

  if (ogObjectRaw.ogImage || ogObjectRaw.ogImageWidth || ogObjectRaw.twitterImageHeight || ogObjectRaw.ogImageType) {
    ogObjectRaw.ogImage = ogObjectRaw.ogImage ?? []
    ogObjectRaw.ogImageWidth = ogObjectRaw.ogImageWidth ?? []
    ogObjectRaw.ogImageHeight = ogObjectRaw.ogImageHeight ?? []
    ogObjectRaw.ogImageType = ogObjectRaw.ogImageType ?? []
  }
  const ogImages = _.zip(ogObjectRaw.ogImage,
    ogObjectRaw.ogImageWidth,
    ogObjectRaw.ogImageHeight,
    ogObjectRaw.ogImageType)
    .map(mediaMapper).sort(mediaSorter)

  /* Combine video/width/height/type
    and sort for priority */
  if (ogObjectRaw.ogVideo || ogObjectRaw.ogVideoWidth || ogObjectRaw.ogVideoHeight || ogObjectRaw.ogVideoType) {
    ogObjectRaw.ogVideo = ogObjectRaw.ogVideo ?? []
    ogObjectRaw.ogVideoWidth = ogObjectRaw.ogVideoWidth ?? []
    ogObjectRaw.ogVideoHeight = ogObjectRaw.ogVideoHeight ?? []
    ogObjectRaw.ogVideoType = ogObjectRaw.ogVideoType ?? []
  }
  const ogVideos = _.zip(ogObjectRaw.ogVideo,
    ogObjectRaw.ogVideoWidth,
    ogObjectRaw.ogVideoHeight,
    ogObjectRaw.ogVideoType)
    .map(mediaMapper).sort(mediaSorter)

  /* Combine twitter image/width/height/alt
    and sort for priority */
  if (ogObjectRaw.twitterImageSrc ||
      ogObjectRaw.twitterImage ||
      ogObjectRaw.twitterImageWidth ||
      ogObjectRaw.twitterImageHeight ||
      ogObjectRaw.twitterImageAlt) {
    // if twitterImage isn't there, try twitterImageSrc
    ogObjectRaw.twitterImage = ogObjectRaw.twitterImage ?? ogObjectRaw.twitterImageSrc ?? []
    ogObjectRaw.twitterImageWidth = ogObjectRaw.twitterImageWidth ?? []
    ogObjectRaw.twitterImageHeight = ogObjectRaw.twitterImageHeight ?? []
    ogObjectRaw.twitterImageAlt = ogObjectRaw.twitterImageAlt ?? []
  }
  const twitterImages = _.zip(ogObjectRaw.twitterImage,
    ogObjectRaw.twitterImageWidth,
    ogObjectRaw.twitterImageHeight,
    ogObjectRaw.twitterImageAlt)
    .map(mediaMapperTwitterImage).sort(mediaSorter)

  /* Combine twitter player/width/height/stream
    and sort for priority */
  if (ogObjectRaw.twitterPlayer ||
      ogObjectRaw.twitterPlayerWidth ||
      ogObjectRaw.twitterPlayerHeight ||
      ogObjectRaw.twitterPlayerStream) {
    ogObjectRaw.twitterPlayer = ogObjectRaw.twitterPlayer ?? []
    ogObjectRaw.twitterPlayerWidth = ogObjectRaw.twitterPlayerWidth ?? []
    ogObjectRaw.twitterPlayerHeight = ogObjectRaw.twitterPlayerHeight ?? []
    ogObjectRaw.twitterPlayerStream = ogObjectRaw.twitterPlayerStream ?? []
  }
  const twitterPlayers = _.zip(ogObjectRaw.twitterPlayer,
    ogObjectRaw.twitterPlayerWidth,
    ogObjectRaw.twitterPlayerHeight,
    ogObjectRaw.twitterPlayerStream)
    .map(mediaMapperTwitterPlayer).sort(mediaSorter)

  /* Combine music:song url, track, disk
    and sort in the right album order */
  if (ogObjectRaw.musicSong || ogObjectRaw.musicSongTrack || ogObjectRaw.musicSongDisc) {
    ogObjectRaw.musicSong = ogObjectRaw.musicSong ?? []
    ogObjectRaw.musicSongTrack = ogObjectRaw.musicSongTrack ?? []
    ogObjectRaw.musicSongDisc = ogObjectRaw.musicSongDisc ?? []
  }
  const musicSongs = _.zip(ogObjectRaw.musicSong,
    ogObjectRaw.musicSongTrack,
    ogObjectRaw.musicSongDisc)
    .map(mediaMapperMusicSong).sort(mediaSorterMusicSong)

  const ogObject: OGData = fields.reduce((acc, item) => {
    if ((
      item.multiple && (
        item.fieldName.startsWith('ogImage') ||
        item.fieldName.startsWith('ogVideo') ||
        item.fieldName.startsWith('twitter') ||
        item.fieldName.startsWith('musicSong')
      )
    )) {
      return acc
    }
    else {
      return {
        ... acc,
        [item.fieldName]: ogObjectRaw[item.fieldName],
      }
    }
  }, {} as OGData)

  // Select the best image
  if (ogImages.length) {
    ogObject.ogImage = ogImages
  }

  // Select the best video
  if (ogVideos.length) {
    ogObject.ogVideo = ogVideos
  }

  // Select the best twitter image
  if (twitterImages.length) {
    ogObject.twitterImage = twitterImages
  }

  // Select the best player
  if (twitterPlayers.length) {
    ogObject.twitterPlayer = twitterPlayers
  }

  // Select the best music:song
  if (musicSongs.length) {
    ogObject.musicSong = musicSongs
  }

  return ogObject
}

function mediaMapperTwitterImage(item: (string | null | undefined)[]): OGTwitterImage {
  return {
    url: item[0]!,
    width: Number(item[1]),
    height: Number(item[2]),
    alt: item[3]!,
  }
}

function mediaMapperTwitterPlayer(item: (string | null | undefined)[]): OGTwitterPlayer {
  return {
    url: item[0]!,
    width: Number(item[1]),
    height: Number(item[2]),
    stream: item[3]!,
  }
}

function mediaMapperMusicSong(item: (string | null | undefined)[]): OGMusicSong {
  return {
    url: item[0]!,
    track: Number(item[1]),
    disc: Number(item[2]!),
  }
}

function mediaMapper(item: (string | null | undefined)[]): OGImage | OGVideo {
  const out = {
    url: item[0]!,
    width: Number(item[1]),
    height: Number(item[2]),
    type: item[3]!,
  }
  if (out.width === null || isNaN(out.width)) {
    delete out.width
  }
  if (out.height === null || isNaN(out.height)) {
    delete out.height
  }
  return out
}

function mediaSorter(a: OGMedia, b: OGMedia) {
  if (!(a.url && b.url)) {
    return 0
  }

  const aRes = a.url.match(/\.(\w{2,5})$/)
  const aExt = (aRes && aRes[1].toLowerCase()) || null
  const bRes = b.url.match(/\.(\w{2,5})$/)
  const bExt = (bRes && bRes[1].toLowerCase()) || null

  if (aExt === 'gif' && bExt !== 'gif') {
    return -1
  } else if (aExt !== 'gif' && bExt === 'gif') {
    return 1
  }
  return Math.max(b.width, b.height) - Math.max(a.width, a.height)
}

function mediaSorterMusicSong(a: OGMusicSong, b: OGMusicSong) {
  if (!(a.track && b.track)) {
    return 0
  } else if (a.disc > b.disc) {
    return 1
  } else if (a.disc < b.disc) {
    return -1
  }
  return a.track - b.track
}
