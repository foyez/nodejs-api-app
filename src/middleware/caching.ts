import { Response, NextFunction } from 'express'
import { promisify } from 'util'
import { redisClient } from '../config/cache'

const getAsync = promisify(redisClient.get).bind(redisClient)

export const getFromCache = async (
  key: string,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await getAsync(key)

    if (data) {
      res.status(200).send(data)
    } else {
      next()
    }
  } catch (err) {
    next()
  }
}
