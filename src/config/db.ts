import { Client } from 'pg'
import { Logger } from './logger'
import { envVars } from './envVars'

export const dbClient = new Client(envVars.dbConnection)

dbClient.on('error', (err: Error) => {
  Logger.error({
    message: `Postgres client: Unexpected error on idle client`,
    extra: err,
  })
  process.exit(1)
})

export const initDb = async (): Promise<void> => {
  try {
    await dbClient.connect()
    Logger.info('Postgres client connected')
  } catch (err) {
    Logger.error('DB connection failed')
  }
}
