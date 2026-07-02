import mongoose from 'mongoose'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      lowercase: true,
      trim: true,
      maxlength: [180, 'Email cannot exceed 180 characters.'],
      match: [emailPattern, 'Please provide a valid email address.'],
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [40, 'Phone cannot exceed 40 characters.'],
      default: '',
    },
    website: {
      type: String,
      trim: true,
      maxlength: [220, 'Website cannot exceed 220 characters.'],
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required.'],
      trim: true,
      maxlength: [3000, 'Message cannot exceed 3000 characters.'],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'contactQueries',
  },
)

contactSchema.index({ createdAt: -1 })
contactSchema.index({ email: 1, createdAt: -1 })

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)
