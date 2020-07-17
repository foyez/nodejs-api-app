import redis, { RedisClient } from 'redis'
import { Logger } from './logger'
import { envVars } from './envVars'

export const redisClient = redis.createClient(envVars.redisUri)

export const initCache = async (): Promise<RedisClient> =>
  new Promise((resolve, reject) => {
    redisClient.on('connect', () => {
      Logger.info('Redis client connected')
      resolve(redisClient)
    })

    redisClient.on('error', (err) => {
      Logger.info('Failed to connect Redis client')
      reject(err)
    })
  })
