import { Request, Response, NextFunction } from 'express'
import { HTTP400Error } from '../utils/httpErrors'

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.query.q) {
    throw new HTTP400Error('Missing q parameter')
  } else {
    next()
  }
}
