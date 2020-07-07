import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
} from './common'
import { handleAPIDocs } from './apiDocs/swaggerMiddleware'

export const middleware = [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs,
]
