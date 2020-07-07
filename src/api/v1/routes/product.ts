import { Router } from 'express'

import { getAllProductsController } from '../controllers/product/getAllProducts'
import { middleware } from '../middleware'

const productRouter = Router()

productRouter.get('/', middleware.productsMiddleware, (req, res, next) =>
  getAllProductsController(req, res, next),
)

export { productRouter }
