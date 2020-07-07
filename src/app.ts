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

// import express from 'express'

// import { config } from './config'
// import { Logger } from './loaders/logger'

// process.on('uncaughtException', (err) => {
//   console.log(err)
//   process.exit(1)
// })

// process.on('unhandledRejection', (err) => {
//   console.log(err)
//   process.exit(1)
// })

// const startServer = async () => {
//   const app = express()

//   await require('./loaders').default({ app })

//   app.listen(config.port, (err) => {
//     if (err) {
//       Logger.error(err)
//       process.exit(1)
//       return
//     }
//     Logger.info(`
//       ################################################
//       🛡️  Server listening on port: ${config.port} 🛡️
//       ################################################
//     `)
//   })
// }

// startServer()
