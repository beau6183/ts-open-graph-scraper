const fields = [
  {
    multiple: false,
    property: 'og:title',
    fieldName: 'ogTitle',
  },
  {
    multiple: false,
    property: 'og:type',
    fieldName: 'ogType',
  },
  {
    multiple: true,
    property: 'og:image',
    fieldName: 'ogImage',
  },
  {
    multiple: true,
    property: 'og:image:url',
    fieldName: 'ogImageURL',
  },
  {
    multiple: true,
    property: 'og:image:secure_url',
    fieldName: 'ogImageSecureURL',
  },
  {
    multiple: true,
    property: 'og:image:width',
    fieldName: 'ogImageWidth',
  },
  {
    multiple: true,
    property: 'og:image:height',
    fieldName: 'ogImageHeight',
  },
  {
    multiple: true,
    property: 'og:image:type',
    fieldName: 'ogImageType',
  },
  {
    multiple: false,
    property: 'og:url',
    fieldName: 'ogUrl',
  },
  {
    multiple: false,
    property: 'og:audio',
    fieldName: 'ogAudio',
  },
  {
    multiple: false,
    property: 'og:audio:url',
    fieldName: 'ogAudioURL',
  },
  {
    multiple: false,
    property: 'og:audio:secure_url',
    fieldName: 'ogAudioSecureURL',
  },
  {
    multiple: false,
    property: 'og:audio:type',
    fieldName: 'ogAudioType',
  },
  {
    multiple: false,
    property: 'og:description',
    fieldName: 'ogDescription',
  },
  {
    multiple: false,
    property: 'og:determiner',
    fieldName: 'ogDeterminer',
  },
  {
    multiple: false,
    property: 'og:locale',
    fieldName: 'ogLocale',
  },
  {
    multiple: false,
    property: 'og:locale:alternate',
    fieldName: 'ogLocaleAlternate',
  },
  {
    multiple: false,
    property: 'og:site_name',
    fieldName: 'ogSiteName',
  },
  {
    multiple: false,
    property: 'og:product:retailer_item_id',
    fieldName: 'ogProductRetailerItemId',
  },
  {
    multiple: false,
    property: 'og:product:price:amount',
    fieldName: 'ogProductPriceAmount',
  },
  {
    multiple: false,
    property: 'og:product:price:currency',
    fieldName: 'ogProductPriceCurrency',
  },
  {
    multiple: false,
    property: 'og:product:availability',
    fieldName: 'ogProductAvailability',
  },
  {
    multiple: false,
    property: 'og:product:condition',
    fieldName: 'ogProductCondition',
  },
  {
    multiple: false,
    property: 'og:price:amount',
    fieldName: 'ogPriceAmount',
  },
  {
    multiple: false,
    property: 'og:price:currency',
    fieldName: 'ogPriceCurrency',
  },
  {
    multiple: false,
    property: 'og:availability',
    fieldName: 'ogAvailability',
  },
  {
    multiple: true,
    property: 'og:video',
    fieldName: 'ogVideo',
  },
  {
    multiple: true,
    property: 'og:video:url', // An alternative to 'og:video'
    fieldName: 'ogVideo',
  },
  {
    multiple: true,
    property: 'og:video:secure_url',
    fieldName: 'ogVideoSecureURL',
  },
  {
    multiple: true,
    property: 'og:video:width',
    fieldName: 'ogVideoWidth',
  },
  {
    multiple: true,
    property: 'og:video:height',
    fieldName: 'ogVideoHeight',
  },
  {
    multiple: true,
    property: 'og:video:type',
    fieldName: 'ogVideoType',
  },
  {
    multiple: true,
    property: 'video:actor',
    fieldName: 'videoActor',
  },
  {
    multiple: true,
    property: 'video:actor:role',
    fieldName: 'videoActorRole',
  },
  {
    multiple: true,
    property: 'video:director',
    fieldName: 'videoDirector',
  },
  {
    multiple: true,
    property: 'video:writer',
    fieldName: 'videoWriter',
  },
  {
    multiple: false,
    property: 'video:duration',
    fieldName: 'videoDuration',
  },
  {
    multiple: false,
    property: 'video:release_date',
    fieldName: 'videoReleaseDate',
  },
  {
    multiple: true,
    property: 'video:tag',
    fieldName: 'videoTag',
  },
  {
    multiple: false,
    property: 'video:series',
    fieldName: 'videoSeries',
  },
  {
    multiple: false,
    property: 'twitter:card',
    fieldName: 'twitterCard',
  },
  {
    multiple: false,
    property: 'twitter:site',
    fieldName: 'twitterSite',
  },
  {
    multiple: false,
    property: 'twitter:site:id',
    fieldName: 'twitterSiteId',
  },
  {
    multiple: false,
    property: 'twitter:creator',
    fieldName: 'twitterCreator',
  },
  {
    multiple: false,
    property: 'twitter:creator:id',
    fieldName: 'twitterCreatorId',
  },
  {
    multiple: false,
    property: 'twitter:title',
    fieldName: 'twitterTitle',
  },
  {
    multiple: false,
    property: 'twitter:description',
    fieldName: 'twitterDescription',
  },
  {
    multiple: true,
    property: 'twitter:image',
    fieldName: 'twitterImage',
  },
  {
    multiple: true,
    property: 'twitter:image:height',
    fieldName: 'twitterImageHeight',
  },
  {
    multiple: true,
    property: 'twitter:image:width',
    fieldName: 'twitterImageWidth',
  },
  {
    multiple: true,
    property: 'twitter:image:src',
    fieldName: 'twitterImageSrc',
  },
  {
    multiple: true,
    property: 'twitter:image:alt',
    fieldName: 'twitterImageAlt',
  },
  {
    multiple: true,
    property: 'twitter:player',
    fieldName: 'twitterPlayer',
  },
  {
    multiple: true,
    property: 'twitter:player:width',
    fieldName: 'twitterPlayerWidth',
  },
  {
    multiple: true,
    property: 'twitter:player:height',
    fieldName: 'twitterPlayerHeight',
  },
  {
    multiple: true,
    property: 'twitter:player:stream',
    fieldName: 'twitterPlayerStream',
  },
  {
    multiple: false,
    property: 'twitter:app:name:iphone',
    fieldName: 'twitterAppNameiPhone',
  },
  {
    multiple: false,
    property: 'twitter:app:id:iphone',
    fieldName: 'twitterAppIdiPhone',
  },
  {
    multiple: false,
    property: 'twitter:app:url:iphone',
    fieldName: 'twitterAppUrliPhone',
  },
  {
    multiple: false,
    property: 'twitter:app:name:ipad',
    fieldName: 'twitterAppNameiPad',
  },
  {
    multiple: false,
    property: 'twitter:app:id:ipad',
    fieldName: 'twitterAppIdiPad',
  },
  {
    multiple: false,
    property: 'twitter:app:url:ipad',
    fieldName: 'twitterAppUrliPad',
  },
  {
    multiple: false,
    property: 'twitter:app:name:googleplay',
    fieldName: 'twitterAppNameGooglePlay',
  },
  {
    multiple: false,
    property: 'twitter:app:id:googleplay',
    fieldName: 'twitterAppIdGooglePlay',
  },
  {
    multiple: false,
    property: 'twitter:app:url:googleplay',
    fieldName: 'twitterAppUrlGooglePlay',
  },
  {
    multiple: true,
    property: 'music:song',
    fieldName: 'musicSong',
  },
  {
    multiple: true,
    property: 'music:song:disc',
    fieldName: 'musicSongDisc',
  },
  {
    multiple: true,
    property: 'music:song:track',
    fieldName: 'musicSongTrack',
  },
  {
    multiple: true,
    property: 'music:musician',
    fieldName: 'musicMusician',
  },
  {
    multiple: false,
    property: 'music:release_date',
    fieldName: 'musicReleaseDate',
  },
  {
    multiple: false,
    property: 'music:duration',
    fieldName: 'musicDuration',
  },
  {
    multiple: true,
    property: 'music:creator',
    fieldName: 'musicCreator',
  },
  {
    multiple: true,
    property: 'music:album',
    fieldName: 'musicAlbum',
  },
  {
    multiple: false,
    property: 'music:album:disc',
    fieldName: 'musicAlbumDisc',
  },
  {
    multiple: false,
    property: 'music:album:track',
    fieldName: 'musicAlbumTrack',
  },
  {
    multiple: false,
    property: 'article:published_time',
    fieldName: 'articlePublishedTime',
  },
  {
    multiple: false,
    property: 'article:modified_time',
    fieldName: 'articleModifiedTime',
  },
  {
    multiple: false,
    property: 'article:expiration_time',
    fieldName: 'articleExpirationTime',
  },
  {
    multiple: true,
    property: 'article:author',
    fieldName: 'articleAuthor',
  },
  {
    multiple: false,
    property: 'article:section',
    fieldName: 'articlePublishedTime',
  },
  {
    multiple: true,
    property: 'article:tag',
    fieldName: 'articleTag',
  },
  {
    multiple: true,
    property: 'book:author',
    fieldName: 'bookAuthor',
  },
  {
    multiple: true,
    property: 'book:tag',
    fieldName: 'bookTag',
  },
  {
    multiple: false,
    property: 'book:isbn',
    fieldName: 'bookIsbn',
  },
  {
    multiple: false,
    property: 'book:release_date',
    fieldName: 'bookReleaseDate',
  },
  {
    multiple: true,
    property: 'profile:first_name',
    fieldName: 'profileFirstName',
  },
  {
    multiple: true,
    property: 'profile:last_name',
    fieldName: 'profileLastName',
  },
  {
    multiple: true,
    property: 'profile:username',
    fieldName: 'profileUsername',
  },
  {
    multiple: true,
    property: 'profile:gender',
    fieldName: 'profileGender',
  },
]

