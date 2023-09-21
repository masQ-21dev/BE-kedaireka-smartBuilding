/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Response } from 'express'
import { userModel, type userAtributes } from '../../models/userModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { CONSOLE } from '../../utilities/log'
import { Op } from 'sequelize'
import { comaparePassword } from '../../utilities/comparePassword'
import { generateAccessToken } from '../../utilities/jwt'
import { accessModel } from '../../models/accessModel'
import { CONFIG } from '../../config'

export const loginController = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as userAtributes

  const emptyfield = RequestChecker({
    requireList: ['user_email', 'password'],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await userModel.findOne({
      raw: true,
      where: {
        deleted_at: { [Op.eq]: 0 },
        user_email: { [Op.like]: requestBody.user_email }
      }
    })

    if (result == null) {
      const message = `Email ${requestBody.user_email} not registered, Please register first !`
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    if (result.email_verified === 0) {
      const message = `Email ${requestBody.user_email} not not yet verified, Please check your email !`
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }
    if (!await comaparePassword(requestBody.password, result.password)) {
      const message = 'Incorrect email or password, Please check again !'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }
    const access = await accessModel.findOne({
      // raw: true,
      where: {
        user_id: { [Op.like]: result.user_id }
      }

    })

    const token = generateAccessToken({
      userId: result.user_id,
      role: access?.role
    }, CONFIG.secret.token, '180s')

    const refresToken = generateAccessToken({
      userId: result.user_id,
      role: access?.role
    }, CONFIG.secret.refressToken, '1d')

    await access?.update({ acces_token: refresToken })

    res.cookie('refresToken', refresToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    const response = ResponseData.default
    response.data = {
      message: 'login success',
      access_token: token
    }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
