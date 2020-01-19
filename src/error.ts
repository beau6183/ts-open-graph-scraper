import { FullResponse } from 'request-promise-native'
export class OGError extends Error {
  public requestError?: any
  public response?: FullResponse
  public get code(): string {
    return this.requestError && this.requestError.code
  }
  public get statusCode() {
    return this.response && this.response.statusCode
  }
  constructor(msg?: string, requestError?: any, res?: FullResponse) {
    if (!msg && requestError && requestError.message) {
      super(requestError.message)
    }
    else {
      super(msg)
    }
    this.requestError = requestError
    this.response = res
  }
}
export default OGError