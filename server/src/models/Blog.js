import mongoose from 'mongoose'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required.'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters.'],
      maxlength: [180, 'Title cannot exceed 180 characters.'],
      index: true,
    },
    slug: {
      type: String,
      required: [true, 'Blog slug is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [220, 'Slug cannot exceed 220 characters.'],
      match: [slugPattern, 'Slug must use lowercase words separated by hyphens.'],
    },
    content: {
      type: String,
      required: [true, 'Blog content is required.'],
      minlength: [20, 'Content must be at least 20 characters.'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Blog author is required.'],
      index: true,
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator(tags) {
          return tags.length <= 20
        },
        message: 'A blog can have at most 20 tags.',
      },
      set(tags) {
        return [...new Set(tags.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))]
      },
    },
  },
  { timestamps: true, collection: 'blogs' },
)

blogSchema.index({ tags: 1 })
blogSchema.index({ title: 'text', content: 'text', tags: 'text' })

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)
