import http from 'http'
import express from 'express'

import { applyMiddleware, applyRoutes } from './utils'
import { middleware } from './middleware'
import { v1Routes } from './services/v1'
import { errorHandlers } from './middleware/errorHandlers'
import { Logger } from './config/logger'
import { envVars } from './config/envVars'
import { initDependencies } from './config'

process.on('uncaughtException', (err) => {
  Logger.error({
    message: `uncaughtException`,
    extra: err,
  })
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  Logger.error({
    message: `unhandledRejection`,
    extra: err,
  })
  process.exit(1)
})

const startServer = async (): Promise<void> => {
  const router = express()

  // Check if all environment variables are set
  envVars.checkEnvVariables()

  applyMiddleware(middleware, router)
  applyRoutes('/api/v1', v1Routes, router)
  applyMiddleware(errorHandlers, router)

  const { PORT = 5000 } = process.env
  const server = http.createServer(router)

  await initDependencies()

  server.listen(PORT, () => {
    Logger.info(`Server listening on port: ${PORT}...`)
  })
}

startServer()
