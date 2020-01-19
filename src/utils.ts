import url from 'url'

/*
 * ends with
 * @param string input - user input url
 * @param string suffix - what might be at the end of the input
 * @param function callback
 */
export function endsWith(input: string, suffix: string) {
  return input.indexOf(suffix, input.length - suffix.length) !== -1
}

/*
 * validate
 * @param string var - user input url and timeout
 * @param function callback
 */
export function validate(inputUrl: string | url.Url, _inputTimeout?: string | number) {
  let returnInputUrl = null
  let returnInputTimeout = 2000 // time defaults to 2000ms

  if (validateInputs(inputUrl?.toString()))
    returnInputUrl = validateUrl(inputUrl?.toString())

  const inputTimeout = parseInt(`${_inputTimeout}`, 10)
  if (validateInputs(inputUrl?.toString()) && validateTimeout(inputTimeout))
    returnInputTimeout = inputTimeout

  return { returnInputUrl, returnInputTimeout }
}

/*
 * validate inputs
 * @param string var - input
 * @param function callback
 */
function validateInputs(input?: string) {
  return (!(input === null || typeof input === 'undefined' || !input || input.length < 1))
}

/*
 * validate url - all urls must have http:// in front of them
 * @param string var - the url we want to scrape
 * @param function callback
 */
function validateUrl(inputUrl: string) {
  return (!/^(f|ht)tps?:\/\//i.test(inputUrl)) ?
    'http://' + inputUrl :
    inputUrl
}

/*
 * validate timeout - how long should we wait for a request
 * @param number var - the time we want to wait
 * @param function callback
 */
function validateTimeout(inputTimeout: number | string) {
  if (!/^\d{1,10}$/.test(`${inputTimeout}`)) return false
  return true
}
