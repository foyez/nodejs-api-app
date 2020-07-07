import { Request, Response, NextFunction } from 'express'

const productsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Middleware')

  next()
}

export const middleware = { productsMiddleware }
