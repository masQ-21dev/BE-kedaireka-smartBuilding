/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import nodemailer from 'nodemailer'
import { CONFIG } from '../config'

const hostConfig = CONFIG.smtp.host as string || 'smtp.gmail.com'
const portConfig: number = parseInt((CONFIG.smtp.port as string)) || 587

export const transporter = nodemailer.createTransport({
  host: hostConfig,
  port: portConfig,
  secure: true,
  auth: {
    user: CONFIG.smtp.email,
    pass: CONFIG.smtp.password
  }
})
