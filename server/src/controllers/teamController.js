import mongoose from 'mongoose'
import { TeamMember } from '../models/TeamMember.js'

const memoryTeam = []

function isConnected() {
  return mongoose.connection.readyState === 1
}

function getImagePath(req) {
  return req.file ? `/uploads/${req.file.filename}` : undefined
}

function normalizeTeamPayload(req, existing = {}) {
  const image = getImagePath(req) || req.body.image || existing.image

  return {
    name: req.body.name,
    role: req.body.role,
    image,
    linkedin: req.body.linkedin || '',
    order: Number(req.body.order || 0),
    isActive: req.body.isActive === 'true' || req.body.isActive === 'on' || req.body.isActive === true,
  }
}

export async function createTeamMember(req, res) {
  try {
    const payload = normalizeTeamPayload(req)

    if (!payload.name || !payload.role || !payload.image) {
      return res.status(400).json({ message: 'Name, role, and image are required.' })
    }

    if (!isConnected()) {
      const item = { ...payload, _id: `${Date.now()}`, createdAt: new Date().toISOString() }
      memoryTeam.push(item)
      return res.status(201).json(item)
    }

    const member = await TeamMember.create(payload)
    return res.status(201).json(member)
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Unable to create team member.' })
  }
}

export async function getTeamMembers(req, res) {
  try {
    const includeInactive = req.query.all === 'true'

    if (!isConnected()) {
      const items = memoryTeam
        .filter((member) => includeInactive || member.isActive)
        .sort((a, b) => Number(a.order) - Number(b.order))
      return res.json(items)
    }

    const query = includeInactive ? {} : { isActive: true }
    const members = await TeamMember.find(query).sort({ order: 1, createdAt: -1 })
    return res.json(members)
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to fetch team members.' })
  }
}

export async function updateTeamMember(req, res) {
  try {
    const { id } = req.params

    if (!isConnected()) {
      const index = memoryTeam.findIndex((member) => String(member._id) === id)
      if (index === -1) return res.status(404).json({ message: 'Team member not found.' })
      const payload = normalizeTeamPayload(req, memoryTeam[index])
      memoryTeam[index] = { ...memoryTeam[index], ...payload }
      return res.json(memoryTeam[index])
    }

    const existing = await TeamMember.findById(id)
    if (!existing) return res.status(404).json({ message: 'Team member not found.' })

    const payload = normalizeTeamPayload(req, existing)
    const member = await TeamMember.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    })
    return res.json(member)
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Unable to update team member.' })
  }
}

export async function deleteTeamMember(req, res) {
  try {
    const { id } = req.params

    if (!isConnected()) {
      const nextTeam = memoryTeam.filter((member) => String(member._id) !== id)
      memoryTeam.length = 0
      memoryTeam.push(...nextTeam)
      return res.json({ message: 'Team member deleted.' })
    }

    await TeamMember.findByIdAndDelete(id)
    return res.json({ message: 'Team member deleted.' })
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Unable to delete team member.' })
  }
}
