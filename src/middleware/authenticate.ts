import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { HTTP401Error } from '../utils/httpErrors'
import { envVars } from '../config/envVars'

const getTokenFromHeader = (req: Request): string | null => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token')
  ) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = getTokenFromHeader(req)

  if (!token) {
    throw new HTTP401Error()
  }

  try {
    jwt.verify(token, envVars.jwtSecretKey)
    next()
  } catch (err) {
    throw new HTTP401Error()
  }
}
