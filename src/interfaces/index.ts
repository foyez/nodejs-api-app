import { Document } from 'mongoose'

export interface Error {
  name?: string
  status?: number
  message?: string
}

// MongoDB Model
interface IToJSONFor {
  id: string
  title: string
  imageUrl: string
  quantity: number
  price: number
}

export interface IProductDocument extends Document {
  // properties
  _id: string
  title: string
  imageUrl: string
  quantity: number
  price: number

  // methods
  toJSONFor(): IToJSONFor
}
