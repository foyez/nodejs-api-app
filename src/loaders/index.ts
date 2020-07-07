import express from 'express'

import { mongooseLoader } from './mongoose'
import { expressLoader } from './express'
import { Logger } from './logger'

export default async ({ app }: { app: express.Application }) => {
  const mongoConnection = await mongooseLoader()
  Logger.info(
    `DB loaded and connected to: ${mongoConnection.connections[0].name}`,
  )

  await expressLoader({ app })
  Logger.info('✌️ Express loaded')
}
