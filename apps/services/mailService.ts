/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import nodemailer from 'nodemailer'
// import { transporter } from './transporter'
import { CONFIG } from '../config'
import { CONSOLE } from '../utilities/log'

const hostConfig = CONFIG.smtp.host as string || 'smtp.gmail.com'
const portConfig: number = parseInt((CONFIG.smtp.port as string)) || 465
const isSecure: boolean = CONFIG.smtp.host === 'smtp.gmail.com'

export interface MailInterface {
  from?: string
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  text?: string
  html: string
}

export default class MailService {
  private static instance: MailService
  // creat tranporter
  private readonly transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: hostConfig,
    port: portConfig,
    secure: isSecure,
    auth: {
      user: CONFIG.smtp.email,
      pass: CONFIG.smtp.password
    }
  })

  private constructor () {}
  // inisilate service
  static getInstance () {
    if (!MailService.instance) MailService.instance = new MailService()

    return MailService.instance
  }

  // sending an email
  async sendEmail (
    requesId: string | number | string[],
    options: MailInterface
  ) {
    CONSOLE.info('email sending')
    await this.transporter.sendMail({
      from: `"${CONFIG.appName} team" ${process.env.SMTP_SENDER || options.from}`,
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      subject: options.subject,
      text: options.text,
      html: options.html
    })
      .then((info) => {
        CONSOLE.info('email sended')
        CONSOLE.info(`${requesId} - Mail send successfully`)
        CONSOLE.info(`${requesId} - [MailResponse] = ${info.response} [MessageId] = ${info.MessageId}`)
        CONSOLE.info(`${requesId} - Nodemailer ethereal URL : ${nodemailer.getTestMessageUrl(info)}`)

        return info
      })
  }

  async verifyConection () {
    return await this.transporter.verify()
  }

  getTransporter () {
    return this.transporter
  }
}
