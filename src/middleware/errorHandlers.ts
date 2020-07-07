import { Request, Response, NextFunction, Router } from 'express'
import * as ErrorHandler from '../utils/ErrorHandler'

const handle404Error = (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  router.use((req: Request, res: Response) => {
    ErrorHandler.notFoundError()
  })
}

const handleClientError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.clientError(err, res, next)
  })
}

const handleServerError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next)
  })
}

export const errorHandlers = [
  handle404Error,
  handleClientError,
  handleServerError,
]
