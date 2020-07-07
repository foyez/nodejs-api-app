import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import methodOverride from 'method-override'
import morgan from 'morgan'

import { config } from '../config'
import { v1Router } from '../api/v1'
import { errorHandlers } from './errorHandlers'

export const expressLoader = ({ app }: { app: express.Application }) => {
  const origin = {
    // origin: isProduction ? 'https://example.com' : '*'
    origin: '*',
  }

  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors(origin))
    .use(compression())
    .use(helmet())
    .use(methodOverride())
    .use(morgan('dev'))
    .use(config.api.prefix, v1Router)
    .use(errorHandlers)
}
