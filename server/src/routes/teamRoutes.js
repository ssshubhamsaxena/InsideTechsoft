import { Router } from 'express'
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
} from '../controllers/teamController.js'
import { uploadTeamImage } from '../middleware/upload.js'

const router = Router()

router.post('/', uploadTeamImage.single('image'), createTeamMember)
router.get('/', getTeamMembers)
router.put('/:id', uploadTeamImage.single('image'), updateTeamMember)
router.delete('/:id', deleteTeamMember)

export default router
