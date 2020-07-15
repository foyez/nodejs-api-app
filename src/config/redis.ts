import redis, { RedisClient } from 'redis'
import { Logger } from './logger'
import { config } from '.'

export const redisClient = redis.createClient({
  host: config.redisHost || '127.0.0.1',
})

export const initRedis = async (): Promise<RedisClient> =>
  new Promise((resolve, reject) => {
    redisClient.on('connect', () => {
      Logger.info('Redis client connected')
      resolve(redisClient)
    })

    redisClient.on('error', (err) => {
      reject(err)
    })
  })
