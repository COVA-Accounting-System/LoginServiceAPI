import Joi from 'joi'
import jwt from 'jsonwebtoken'

import { config } from 'dotenv'

config()

export const validateUserData = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().max(100).required(),
    lastName: Joi.string().max(100).required(),
    phone: Joi.string().max(30).required(),
    field: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  })

  const { error } = schema.validate(req.body)
  console.log(error)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}

export const validateLoginData = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

export const validateAdminData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}

export const validateAdminToken = (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    if (!token) return res.status(403).json({ message: 'No token provided' })
 
    const userId = jwt.verify(token, process.env.SECRET)
    if (!userId) {
      return res.status(400).json({ message: 'Token is not correct' })
    }

    next()
  } catch (err) {
    res.status(400).json({ message: 'Unauthorized!' })
  }
}
