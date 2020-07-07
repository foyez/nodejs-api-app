import http from 'http'
import express from 'express'

import { applyMiddleware, applyRoutes } from './utils'
import { middleware } from './middleware'
import { routes } from './services'
import { errorHandlers } from './middleware/errorHandlers'

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

const startServer = () => {
  const router = express()

  applyMiddleware(middleware, router)
  applyRoutes(routes, router)
  applyMiddleware(errorHandlers, router)

  const { PORT = 5000 } = process.env
  const server = http.createServer(router)

  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`)
  })
}

startServer()
