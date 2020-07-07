import mongoose from 'mongoose'
import { config } from '../config'

export const mongooseLoader = () => {
  return mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
}
