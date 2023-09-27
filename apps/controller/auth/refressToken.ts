import { type Response } from 'express'
import { CONSOLE } from '../../utilities/log'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { accessModel } from '../../models/accessModel'
import { type jwtPayloadInterface, verifyAccessToken, generateAccessToken } from '../../utilities/jwt'
import { CONFIG } from '../../config'
import { userModel } from '../../models/userModel'

export const refressToken = async function (req: any, res: Response): Promise<any> {
  try {
    const cookieRefressToken = req.cookies.refresToken

    if (cookieRefressToken == null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    const dataToken = verifyAccessToken(cookieRefressToken, CONFIG.secret.refressToken) as jwtPayloadInterface
    if (dataToken == null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    const userAcces = await userModel.findOne({
      raw: true,
      attributes: ['user_id', 'role'],
      include: {
        model: accessModel,
        attributes: ['acces_token'],
        where: {
          acces_token: cookieRefressToken
        },
        as: 'access'
      }
    })
    if (userAcces == null || dataToken.userId !== userAcces.user_id || dataToken.role !== userAcces.role) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    const newToken = generateAccessToken({ userId: userAcces.user_id, role: userAcces.role }, CONFIG.secret.token, '180s')

    const response = ResponseData.default
    response.data = {
      message: 'Token Refresed',
      access_token: newToken
    }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
