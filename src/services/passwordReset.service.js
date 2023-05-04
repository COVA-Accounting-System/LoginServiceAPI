import { User } from '../models/user.model.js'
import crypto from 'crypto'
import mailer, { USER_EMAIL } from './nodemailer.js'
import {
  getUser,
  findUserByIdAndUpdate,
  findUserAndCheckRecoverTokenValidity,
  editUser
} from '../databases/user.repository.js'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()

export const forgotPasswordService = async (req, res) => {
  const { email } = req.body

  try {
    const user = await getUser({ email })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: 60 * 60})
    // const token = crypto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await findUserByIdAndUpdate(user._id, {
      passwordResetToken: token,
      passwordResetExpires: now
    })

    const mailOptions = {
      to: email,
      from: USER_EMAIL,
      subject: 'Cambio de contraseña ACSYS',
      text: `Recibiste este mensaje porque tú (o alguien más) solicitó el cambio de contraseña de tu cuenta.\n\nPor favor haz click en el siguiente enlace, o cópialo y pégalo en tu navegador para completar el proceso: \n\n${process.env.FRONT_END_URL}/change-password/${token}\n\nSi tú no hiciste esta solicitud, ingora este email y tu contraseña se mantendrá sin cambios.\n`
    }

    mailer.sendMail(mailOptions, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Could not send reset password email' })
      }
      res.status(200).json({ message: 'Reset password email sent' })
    })
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error on forgot password, please try again' })
  }
}

export const resetPasswordService = async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  let email

  try{
    const response = jwt.verify(token, process.env.SECRET)
    email = response.email
  }
  catch{
    return res.status(400).json({ message: 'Invalid or expired token' })
  }

  try {
    
    const user = await findUserAndCheckRecoverTokenValidity({ email }, token)
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' })
    }

    const encryptedPassword = await User.encryptPassword(password)

    const updatePassword = { 
      password: encryptedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    }

    await editUser(user._id, updatePassword)

    res.status(200).json({ message: 'Password updated successfully' })
  } catch (err) {
    res.status(400).json({ message: 'Cannot reset password, please try again' })
  }
}
