import { Response, NextFunction } from 'express'

import { HTTPClientError, HTTP404Error } from '../utils/httpErrors'
import { Logger } from '../config/logger'

export const notFoundError = (): void => {
  throw new HTTP404Error('Method not found.')
}

export const clientError = (
  err: Error,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof HTTPClientError) {
    const { message, statusCode } = err
    Logger.warn({ message })
    res.status(statusCode).send(message)
  } else {
    next(err)
  }
}

export const serverError = (
  err: Error,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Internal Server Error')
  } else {
    res.status(500).send(err.stack)
  }
}
