import { Router } from 'express'
import {
  createUserService,
  getAllUsersService,
  editUserService,
  deleteUserService
} from '../services/user.service.js'
import { validateUserData } from '../middleware/validateData.js'

const router = Router()

router.post('/createAccount', validateUserData, async (req, res) => {
  try {
    const newUser = await createUserService(req)
    return res.json(newUser)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.get('/getUsers', async (req, res) => {
  try {
    const users = await getAllUsersService(req)
    return res.json(users)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.put('/editUser', validateUserData, async (req, res) => {
    try {
        const users = await editUserService(req)
        return res.json(users)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.put('/deleteUser', async (req, res) => {
    try {
        const users = await deleteUserService(req)
        return res.json(users)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default router
