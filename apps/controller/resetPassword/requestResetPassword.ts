import { type Response } from 'express'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { CONSOLE } from '../../utilities/log'
import { otpModels, type otpAtributes } from '../../models/otpModel'
import { userModel } from '../../models/userModel'
import { Op } from 'sequelize'
import otpGenerator from 'otp-generator'
import { otpMailVerify } from '../../templetes'
import MailService from '../../services/mailService'
import { CONFIG } from '../../config'

export const requestResetPassword = async function (req: any, res: Response): Promise<any> {
  const requestQuery = req.query as otpAtributes

  const emptyfield = RequestChecker({
    requireList: ['email'],
    requestData: requestQuery
  })
  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield} )`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const emailChecker = await userModel.findOne({
      where: {
        deleted_at: { [Op.eq]: 0 },
        user_email: { [Op.like]: requestQuery.email }
      }
    })
    if (emailChecker == null) {
      const message = `Email ${requestQuery.email} not registered, Please register first !`
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    const otp = otpGenerator.generate(6, {
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false
    })

    requestQuery.otp = otp
    await otpModels.create(requestQuery)

    // send email
    const mailTemplate = otpMailVerify(otp)
    const mailService = MailService.getInstance()

    void mailService.sendEmail(req.headers['X-Request-Id'], {
      from: CONFIG.smtp.email,
      to: requestQuery.email,
      subject: 'Email Verify',
      html: mailTemplate.html,
      text: mailTemplate.text
    })

    return res.send(mailTemplate.html)

    // const response = ResponseData.default
    // response.data = { message: 'otp code has sended to your email address' }
    // return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
