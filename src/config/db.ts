import { Client } from 'pg'
import { config } from '.'
import { Logger } from './logger'

export const dbClient = new Client(config.dbConnection)

dbClient.on('error', (err: Error) => {
  Logger.error({
    message: `Postgres client: Unexpected error on idle client`,
    extra: err,
  })
  process.exit(1)
})

export const initDb = async (): Promise<void> => {
  await dbClient.connect()
  Logger.info('Postgres client connected')
}
