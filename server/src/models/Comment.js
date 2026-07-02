import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'Blog reference is required.'],
      index: true,
    },
    userName: {
      type: String,
      required: [true, 'User name is required.'],
      trim: true,
      maxlength: [120, 'User name cannot exceed 120 characters.'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required.'],
      trim: true,
      minlength: [2, 'Comment must be at least 2 characters.'],
      maxlength: [2000, 'Comment cannot exceed 2000 characters.'],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'comments',
  },
)

commentSchema.index({ blogId: 1, createdAt: -1 })

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)
