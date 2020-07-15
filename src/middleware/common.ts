import { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

export const handleCors = (router: Router): Router =>
  router.use(cors({ credentials: true, origin: true }))

export const handleBodyRequestParsing = (router: Router): void => {
  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())
}

export const handleCompression = (router: Router): void => {
  router.use(compression())
}

export const handleCookie = (router: Router): void => {
  router.use(cookieParser())
}

export const handleMorgan = (router: Router): void => {
  router.use(morgan('dev'))
}
