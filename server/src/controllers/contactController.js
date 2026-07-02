import mongoose from 'mongoose'
import { Contact } from '../models/Contact.js'

export const memoryContacts = []

function isConnected() {
  return mongoose.connection.readyState === 1
}

export async function createContact(req, res) {
  try {
    const { name, email, phone = '', website = '', message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' })
    }

    const payload = { name, email, phone, website, message }

    if (!isConnected()) {
      const contact = { ...payload, _id: `${Date.now()}`, createdAt: new Date().toISOString() }
      memoryContacts.unshift(contact)
      return res.status(201).json({ message: 'Contact query saved.', contact })
    }

    const contact = await Contact.create(payload)
    return res.status(201).json({ message: 'Contact query saved.', contact })
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Unable to save contact query.' })
  }
}

export async function getContacts(req, res) {
  try {
    if (!isConnected()) return res.json(memoryContacts)

    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(200)
    return res.json(contacts)
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to fetch contact queries.' })
  }
}
