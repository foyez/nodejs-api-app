import dotenv from 'dotenv'
import { Logger } from './logger'
import { initCache } from './cache'
import { initDb } from './db'

const envFound = dotenv.config()

if (!envFound) {
  // This error should crash whole process
  Logger.error("Couldn't find .env file")
  throw new Error("Couldn't find .env file")
}

// required variables
const ENV_VARS = ['JWT_SECRETE_KEY', 'DB_CONNECTION', 'REDIS_HOST']

export const config = {
  jwtSecretKey: process.env.JWT_SECRETE_KEY as string,
  redisHost: process.env.REDIS_HOST as string,
  dbConnection: process.env.DB_CONNECTION as string,

  checkEnvVariables: (): void => {
    ENV_VARS.forEach((key) => {
      if (!process.env[key]) {
        Logger.error('Missing the environment variable ' + key)
        throw new Error('ERROR: Missing the environment variable ' + key)
      } else {
        // Check that urls use https
        if (['TEST_URL'].includes(key)) {
          const url = process.env[key]
          if (!url?.startsWith('https://')) {
            Logger.warn(`Your ${key} does not begin with "https://"`)
          }
        }
      }
    })
  },
}

export const initDependencies = async (): Promise<void> => {
  await initCache()
  // await initDb()
}
