import { Router } from 'express'
import mongoose from 'mongoose'
import { createAdminToken, requireAdmin } from '../middleware/adminAuth.js'
import { ContentItem } from '../models/ContentItem.js'
import { Lead } from '../models/Lead.js'
import { defaultContent } from '../data/defaultContent.js'
import { memoryContacts } from '../controllers/contactController.js'

const router = Router()
const contentTypes = ['services', 'team', 'faqs', 'stats', 'testimonials', 'serviceDetails']

const memoryContent = Object.fromEntries(
  contentTypes.map((type) => [
    type,
    defaultContent[type].map((item, index) => ({
      ...item,
      _id: `${type}-${index + 1}`,
    })),
  ]),
)

function isConnected() {
  return mongoose.connection.readyState === 1
}

function sanitizeByType(type, payload) {
  const base = {
    type,
    order: Number(payload.order || 0),
    isActive: payload.isActive !== false,
  }

  if (type === 'services') {
    return {
      ...base,
      slug: payload.slug,
      title: payload.title,
      summary: payload.summary,
      icon: payload.icon || 'Code2',
    }
  }

  if (type === 'team') {
    return {
      ...base,
      name: payload.name,
      role: payload.role,
      image: payload.image,
    }
  }

  if (type === 'faqs') {
    return {
      ...base,
      question: payload.question,
      answer: payload.answer,
    }
  }

  if (type === 'testimonials') {
    return {
      ...base,
      name: payload.name,
      role: payload.role,
      image: payload.image,
      message: payload.message,
    }
  }

  if (type === 'serviceDetails') {
    return {
      ...base,
      slug: payload.slug,
      title: payload.title,
      subtitle: payload.subtitle,
      description: payload.description,
      image: payload.image,
      heroImage: payload.heroImage,
      highlights: payload.highlights,
    }
  }

  return {
    ...base,
    value: payload.value,
    label: payload.label,
  }
}

async function getContent() {
  if (!isConnected()) return memoryContent

  const entries = await ContentItem.find().sort({ order: 1, createdAt: 1 }).lean()
  if (!entries.length) return defaultContent

  return contentTypes.reduce((acc, type) => {
    acc[type] = entries.filter((entry) => entry.type === type && entry.isActive)
    return acc
  }, {})
}

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@insidetechsoft.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid admin credentials.' })
  }

  return res.json({
    token: createAdminToken(),
    user: { email: adminEmail },
  })
})

router.get('/', async (req, res) => {
  res.json(await getContent())
})

router.get('/content', async (req, res) => {
  res.json(await getContent())
})

router.get('/content/:type', requireAdmin, async (req, res) => {
  const { type } = req.params
  if (!contentTypes.includes(type)) return res.status(404).json({ message: 'Unknown content type.' })

  if (!isConnected()) return res.json(memoryContent[type] || [])

  const items = await ContentItem.find({ type }).sort({ order: 1, createdAt: 1 })
  return res.json(items)
})

router.post('/content/:type', requireAdmin, async (req, res) => {
  const { type } = req.params
  if (!contentTypes.includes(type)) return res.status(404).json({ message: 'Unknown content type.' })

  const item = sanitizeByType(type, req.body)

  if (!isConnected()) {
    const memoryItem = { ...item, _id: `${Date.now()}` }
    memoryContent[type].push(memoryItem)
    return res.status(201).json(memoryItem)
  }

  const savedItem = await ContentItem.create(item)
  return res.status(201).json(savedItem)
})

router.put('/content/:type/:id', requireAdmin, async (req, res) => {
  const { type, id } = req.params
  if (!contentTypes.includes(type)) return res.status(404).json({ message: 'Unknown content type.' })

  const item = sanitizeByType(type, req.body)

  if (!isConnected()) {
    const index = memoryContent[type].findIndex((entry) => String(entry._id) === id)
    if (index === -1) return res.status(404).json({ message: 'Item not found.' })
    memoryContent[type][index] = { ...memoryContent[type][index], ...item }
    return res.json(memoryContent[type][index])
  }

  const updatedItem = await ContentItem.findOneAndUpdate({ _id: id, type }, item, { new: true })
  if (!updatedItem) return res.status(404).json({ message: 'Item not found.' })
  return res.json(updatedItem)
})

router.delete('/content/:type/:id', requireAdmin, async (req, res) => {
  const { type, id } = req.params
  if (!contentTypes.includes(type)) return res.status(404).json({ message: 'Unknown content type.' })

  if (!isConnected()) {
    memoryContent[type] = memoryContent[type].filter((entry) => String(entry._id) !== id)
    return res.json({ message: 'Deleted.' })
  }

  await ContentItem.findOneAndDelete({ _id: id, type })
  return res.json({ message: 'Deleted.' })
})

router.get('/leads', requireAdmin, async (req, res) => {
  if (!isConnected()) return res.json(memoryContacts)

  const leads = await Lead.find().sort({ createdAt: -1 }).limit(200)
  return res.json(leads)
})

export default router
