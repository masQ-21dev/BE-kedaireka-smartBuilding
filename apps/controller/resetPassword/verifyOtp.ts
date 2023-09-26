import { type Response } from 'express'
import { otpModels, type otpAtributes } from '../../models/otpModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { CONSOLE } from '../../utilities/log'
import { userModel } from '../../models/userModel'
import { generateAccessToken } from '../../utilities/jwt'
import { CONFIG } from '../../config'

export const verifyOtp = async function (req: any, res: Response): Promise<any> {
  const requestQuery = req.query as otpAtributes

  const emptyfield = RequestChecker({
    requireList: ['email', 'otp'],
    requestData: requestQuery
  })

  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield} )`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const otpData = await otpModels.findOne({
      where: {
        email: { [Op.like]: requestQuery.email },
        otp: { [Op.like]: requestQuery.otp }
      }
    })
    const date = Date.now()

    if (otpData == null) {
      const message = 'OTP code not found'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    const timeExpire = new Date(otpData.tokenexpires).getTime()

    if (timeExpire < date) {
      const message = 'OTP code has been invalid'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    await otpData.destroy()
    const userData = await userModel.findOne({
      where: {
        user_email: { [Op.like]: otpData.email }
      }
    })

    if (userData == null) {
      const message = ' Accunt not found'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    const token = generateAccessToken({ userId: userData.user_id, role: 'admin' }, CONFIG.secret.token, '10m')

    console.log(token)

    const message = {
      otpData,
      token
    }
    const response = ResponseData.default
    response.data = message
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
