import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
} from './common'
import { handleAPIDocs } from './apiDocs/swaggerMiddleware'

export const middleware = [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
  handleAPIDocs,
]
