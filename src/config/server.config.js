import express, { urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from '../routes/user.route.js'
import authRouter from '../routes/auth.route.js'
import adminRouter from '../routes/admin.route.js'
import adminAuth from '../routes/adminAuth.route.js'
import {
  validateAdminToken,
  validateLoginData,
  validateAdminData
} from '../middleware/validateData.js'
import './db.config.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json('This is the authentication server')
})

app.use('/api/user', validateAdminToken, userRouter)
app.use('/api/auth', validateLoginData, authRouter)

app.use('/api/admin', validateAdminData, adminRouter)
app.use('/api/adminAuth', validateLoginData, adminAuth)

export default app
