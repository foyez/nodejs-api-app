import { Request, Response, NextFunction } from 'express'
import { promisify } from 'util'
import { redisClient } from '../config/redis'

const getAsync = promisify(redisClient.get).bind(redisClient)

export const getFromCache = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const query = req.query.q as string

  try {
    const data = await getAsync(query)
    if (data) {
      res.status(200).send(data)
    } else {
      next()
    }
  } catch (err) {
    next()
  }
}
