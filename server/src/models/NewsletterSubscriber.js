import mongoose from 'mongoose'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [180, 'Email cannot exceed 180 characters.'],
      match: [emailPattern, 'Please provide a valid email address.'],
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
    collection: 'newsletterSubscribers',
  },
)

export const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema)
