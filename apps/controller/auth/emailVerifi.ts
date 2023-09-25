/* eslint-disable @typescript-eslint/no-floating-promises */
import { type Response } from 'express'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { verifyAccessToken, generateToken } from '../../utilities/jwt'
import { CONFIG } from '../../config'
import { Op } from 'sequelize'
import { CONSOLE } from '../../utilities/log'
import { userModel } from '../../models/userModel'
import { verifyEmailTemplate } from '../../templetes'
import MailService from '../../services/mailService'
// import { CONFIG } from '../../config'

export const emailVerifiController = async function (req: any, res: Response): Promise<any> {
  const requestQuery = req.query

  const emptyfield = RequestChecker({
    requireList: ['id'],
    requestData: requestQuery
  })

  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield} )`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = verifyAccessToken(requestQuery.id, CONFIG.secret.emailVerification)
    console.log(result)
    if (result === null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }
    const userAcunt = await userModel.findOne({
      where: {
        user_id: { [Op.like]: result.id }
      }
    })
    if (userAcunt == null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }
    if (userAcunt.email_verified !== 0) {
      const response = ResponseData.error('your emial has been verified')
      response.next = `${CONFIG.appUrl}:${CONFIG.port}/api/v2/login`
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    userAcunt.email_verified = 1
    void userAcunt.save()

    const response = ResponseData.default
    response.data = { message: 'email has been successfully verified' }
    response.next = `${CONFIG.appUrl}:${CONFIG.port}/api/v2/login`
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const requestEmailVerivicattion = async function (req: any, res: Response): Promise<any> {
  const requestQuery = req.query
  console.log(requestQuery)

  // cheking request
  const emptyfield = RequestChecker({
    requireList: ['user_id'],
    requestData: requestQuery
  })
  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield} )`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    // cheking database
    const userAcunt = await userModel.findOne({
      raw: true,
      where: {
        user_id: { [Op.like]: requestQuery.user_id }
      }
    })

    if (userAcunt == null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    // token email verification
    const token = generateToken({ id: userAcunt.user_id }, CONFIG.secret.emailVerification, '1h')
    console.log(token)

    // link for verivicartion
    const link = `${CONFIG.appUrl}:${CONFIG.port}/api/v2/auth/verifiemail?id=${token}`
    // templeting email
    const emailTemplate = verifyEmailTemplate(link)
    // sending email
    const mailService = MailService.getInstance()
    mailService.sendEmail(req.headers['X-Request-Id'], {
      from: CONFIG.smtp.email,
      to: userAcunt.user_email,
      subject: 'Email Verify',
      html: emailTemplate.html,
      text: emailTemplate.text
    })

    const response = ResponseData.default
    response.data = {
      message: 'Email verification has been seeded, please cheake your email box',
      link
    }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
