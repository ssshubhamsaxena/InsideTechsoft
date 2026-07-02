import mongoose from 'mongoose'

const contentItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['services', 'team', 'faqs', 'stats', 'testimonials', 'serviceDetails'],
      required: true,
      index: true,
    },
    slug: { type: String, trim: true },
    title: { type: String, trim: true },
    summary: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, trim: true },
    heroImage: { type: String, trim: true },
    highlights: { type: String, trim: true },
    icon: { type: String, trim: true },
    name: { type: String, trim: true },
    role: { type: String, trim: true },
    image: { type: String, trim: true },
    question: { type: String, trim: true },
    answer: { type: String, trim: true },
    message: { type: String, trim: true },
    value: { type: String, trim: true },
    label: { type: String, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export const ContentItem = mongoose.models.ContentItem || mongoose.model('ContentItem', contentItemSchema)
