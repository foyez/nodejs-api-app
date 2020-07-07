import { Request, Response, NextFunction } from 'express'

import { Error } from '../interfaces'

// catch 404 and forward to error handler
export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const err: Error = new Error('Not found')
  err.status = 404

  next(err)
}

// unauthorized & validation error
const unAuthorizedError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /**
   * Handle 401 throw by express-jwt library
   */
  if (err.name === 'UnauthorizedError') {
    return res
      .status(err.status || 401)
      .send({ message: err.message })
      .end()
  }

  /**
   * Handle Validation Error
   */
  // if (err.name === 'ValidationError') {
  //   return res.status(err.status || 422).json({
  //     errors: err.details
  //       ? // Joi error handling
  //         err.details.reduce((errors, error) => {
  //           errors[error.path[0]] = error.message

  //           return errors
  //         }, {})
  //       : // Mongoose error handling
  //         Object.keys(err.errors).reduce((errors, key) => {
  //           errors[key] = err.errors[key].message

  //           return errors
  //         }, {}),
  //   })
  // }

  return next(err)
}

// Server Error
const serverError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // res.status(err.status || 500)
  // res.json({
  //   errors: {
  //     message: err.message,
  //     code: err.status,
  //   },
  // })

  const errors = { message: err.message }

  // if (process.env.NODE_ENV === 'development') {
  //   console.log(err.stack)
  //   errors.error = err
  // }

  res.status(err.status || 500)
  res.json({ errors })
}

export const errorHandlers = [notFoundError, unAuthorizedError, serverError]
