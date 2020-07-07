import { Router } from 'express'

import { productRouter } from './routes/product'
import { swaggerRouter } from './routes/swagger/swagger'

const v1Router = Router()

v1Router.get('/', (req, res) => {
  return res.json({ message: 'Server is working...' })
})

v1Router.use('/products', productRouter)
v1Router.use('/docs', swaggerRouter)

export { v1Router }
