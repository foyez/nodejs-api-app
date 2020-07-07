import dotenv from 'dotenv'

const envFound = dotenv.config()

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const devMode = process.env.NODE_ENV === 'development'
const databaseURL = devMode
  ? String(envFound.parsed?.MONGODB_URI_DEV)
  : String(envFound.parsed?.MONGODB_URI)

if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export const config = {
  /**
   * Your favorite port
   */
  port: Number(process.env.PORT),

  /**
   * That long string from mlab
   */
  databaseURL,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api/v1',
  },
}
