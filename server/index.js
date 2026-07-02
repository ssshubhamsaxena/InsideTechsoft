import 'dotenv/config'
import path from 'node:path'
import express from 'express'
import cors from 'cors'
import { connectDatabase } from './src/config/db.js'
import adminRoutes from './src/routes/adminRoutes.js'
import contactRoutes from './src/routes/contactRoutes.js'
import leadRoutes from './src/routes/leadRoutes.js'
import teamRoutes from './src/routes/teamRoutes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.use('/uploads', express.static(path.resolve('uploads')))

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'InsideTechSoft API',
  })
})

app.use('/api/leads', leadRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/content', adminRoutes)

app.use((error, req, res, next) => {
  void req
  void next
  res.status(400).json({
    message: error.message || 'Request failed.',
  })
})

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`InsideTechSoft API running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Unable to start API server:', error.message)
    process.exit(1)
  })
