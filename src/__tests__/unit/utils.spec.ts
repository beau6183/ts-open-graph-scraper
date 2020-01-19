import 'jest'
import * as utils from '../../utils'

describe('utils', function () {
  describe('endsWith', function () {
    it('should ends with', function (done) {
      const endsWith = utils.endsWith('test', '.jpg')
      expect(endsWith).toEqual(false)
      done()
    })
    it('should not ends with', function (done) {
      const endsWith = utils.endsWith('test.jpg', '.jpg')
      expect(endsWith).toEqual(true)
      done()
    })
  })

  describe('validate', function () {
    it('should be valid', function (done) {
      const validate = utils.validate('www.test.com', 2000)
      expect(validate.returnInputUrl).toEqual('http://www.test.com')
      expect(validate.returnInputTimeout).toEqual(2000)
      done()
    })
    it('should also be valid', function (done) {
      const validate = utils.validate('http://www.test.com', 2000)
      expect(validate.returnInputUrl).toEqual('http://www.test.com')
      expect(validate.returnInputTimeout).toEqual(2000)
      done()
    })
    it('should be not valid', function (done) {
      const validate = utils.validate('http://www.test.com', 'asda')
      expect(validate.returnInputUrl).toEqual('http://www.test.com')
      expect(validate.returnInputTimeout).toEqual(2000)
      done()
    })
    it('should be not valid', function (done) {
      const validate = utils.validate('', 2000)
      expect(validate.returnInputUrl).toEqual(null)
      expect(validate.returnInputTimeout).toEqual(2000)
      done()
    })
  })
})
