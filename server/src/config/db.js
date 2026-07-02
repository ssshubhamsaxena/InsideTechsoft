import mongoose from 'mongoose'
import '../models/index.js'

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.warn('MONGODB_URI is not set. API will run without a database connection.')
    return
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log('MongoDB connected')
}
