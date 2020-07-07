import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
} from './common'

export const middleware = [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
]
