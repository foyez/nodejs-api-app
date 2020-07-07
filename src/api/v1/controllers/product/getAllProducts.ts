import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { Product } from '../../../../models/product.model'

// import products from './products.data'
// const Product = mongoose.model('Product')

export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // throw new Error()
    const products = await Product.find()
    const resProducts = products.map((product) => product.toJSONFor())

    return res.json({ products: resProducts })
  } catch (err) {
    next(err)
  }
}
