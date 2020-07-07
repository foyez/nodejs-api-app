import { Schema, model } from 'mongoose'
import { IProductDocument } from '../interfaces'

const ProductSchema: Schema<IProductDocument> = new Schema(
  {
    title: String,
    imageUrl: String,
    quantity: Number,
    price: { type: Number, required: true },
  },
  { timestamps: true },
)

ProductSchema.methods.toJSONFor = function () {
  return {
    id: this._id,
    title: this.title,
    imageUrl: this.imageUrl,
    quantity: this.quantity,
    price: this.price,
  }
}

export const Product = model<IProductDocument>('Product', ProductSchema)
