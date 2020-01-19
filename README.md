# ts-open-graph-scraper

[![Build Status](https://travis-ci.org/beau6183/ts-open-graph-scraper.png?branch=master)](https://travis-ci.org/beau6183/ts-open-graph-scraper)
[![Known Vulnerabilities](https://snyk.io/test/github/beau6183/ts-open-graph-scraper/badge.svg)](https://snyk.io/test/github/beau6183/ts-open-graph-scraper)
[![Coverage Status](https://coveralls.io/repos/github/beau6183/ts-open-graph-scraper/badge.svg?branch=master)](https://coveralls.io/github/beau6183/ts-open-graph-scraper?branch=master)

A simple typescript-based node module for scraping Open Graph and Twitter Card info off a site.

## Installation

```sh
npm install ts-open-graph-scraper
```

### Usage

The major departure from @jshemas's [openGraphScraper](https://github.com/jschema/openGraphScraper) is this is entirely Typescript-based and implements *only* a promise interface. Additionally, it uses [request-promise-native](https://github.com/request/request-promise-native) internally, so overloading it with Bluebird, etc., requires hoisting.

The `OGOptions` parameter extends [Request](https://github.com/request/request)'s URL-based options, with the exclusion of `json` and `callback` options. Any other parameter is forwarded on. (eg, if you want to override headers, user-agent, etc., you can do it through these options where possible in `request`)

Additional properties are mostly similar to what's found in @jshemas's [openGraphScraper](https://github.com/jschema/openGraphScraper)

```typescript
import ogs from 'ts-open-graph-scraper'

async function main() {
  const ogResults = await ogs('https://opg.me')
  // OR
  const ogResults = await ogs({
    url: 'https://opg.me'
  })
  console.table(ogResults)
}
```

## To-Dos

* Build this README out more
* Expand coverage
* Add more one-off expansions, like YouTube and Instagram

## Contributing

I'll do my best to keep this maintained. In general:

* Fork this project
* Typescript everything
* Coding convention is enforced by `tslint.json`
* Try not to bring new packages in, unless there's a damned good reason
* File an issue that provides reproduction steps or reasoning for the enhancement
* Issue a pull request and reference the issue in standard syntax for easy cross referencing
* Test coverage must not decline
