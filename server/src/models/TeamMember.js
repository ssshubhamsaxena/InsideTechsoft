import mongoose from 'mongoose'

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters.'],
      maxlength: [120, 'Name cannot exceed 120 characters.'],
    },
    role: {
      type: String,
      required: [true, 'Role is required.'],
      trim: true,
      maxlength: [140, 'Role cannot exceed 140 characters.'],
    },
    image: {
      type: String,
      required: [true, 'Image is required.'],
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    collection: 'teamMembers',
  },
)

teamMemberSchema.index({ isActive: 1, order: 1, createdAt: -1 })

export const TeamMember =
  mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema)
