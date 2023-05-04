import { Router } from 'express'
import { forgotPasswordService, resetPasswordService } from '../services/passwordReset.service.js'

const router = Router()

router.post('/forgot-password', forgotPasswordService)

router.post('/reset-password/:token', resetPasswordService)

export default router
