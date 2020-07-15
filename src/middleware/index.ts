import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
  handleMorgan,
} from './common'
import { handleAPIDocs } from './apiDocs/swaggerMiddleware'
import { handleRateLimit, handleHTTPHeaders, handleCSRF } from './security'

export const middleware = [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleMorgan,
  handleCookie,
  handleRateLimit,
  handleHTTPHeaders,
  handleCSRF,
  handleAPIDocs,
]
