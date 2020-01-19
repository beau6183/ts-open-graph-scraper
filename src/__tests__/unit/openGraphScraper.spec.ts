import 'jest'
import openGraphScraper from '../../openGraphScraper'

describe('openGraphScraper', function () {
  afterEach(function () {
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })
  describe('run', function () {

    it('should be able to hit site and find OG info', async () => {
      const result = await openGraphScraper({
        html: '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>',
      })
      expect(result.ogTitle).toBe('test page')
    })

    it('should be able to hit site and find OG info - promise version', async () => {
      const result = await openGraphScraper({
        html: '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>',
      })
      expect(result.ogTitle).toBe('test page')
    })

    it('should not be able to hit a black list site', async () => {
      try {
        const response = await openGraphScraper({
          'url': 'http://www.test.com/test',
          'blacklist': ['http://www.test.com'],
        })
        expect(response).toBe(undefined)
      }
      catch (error) {
        expect(error.message).toBe('Host Name Has Been Black Listed')
      }
    })

    it('should not be able to hit a bad url', async () => {
      try {
        await openGraphScraper({
          'url': '',
        })
      }
      catch (error) {
        expect(error.message).toBe('Invalid URL')
      }
    })
  })
})
