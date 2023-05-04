import nodemailer from 'nodemailer'
import { config } from 'dotenv'
config()

const { USER_EMAIL, USER_EMAIL_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER_EMAIL,
        pass: USER_EMAIL_PASSWORD
    }
})

export {transporter as default, USER_EMAIL}