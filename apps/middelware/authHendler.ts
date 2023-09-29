/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response, type NextFunction } from 'express'
import { CONSOLE } from '../utilities/log'
import { ResponseData } from '../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { type jwtPayloadInterface, verifyAccessToken } from '../utilities/jwt'
import { CONFIG } from '../config'

export const userAuthorization = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authheder = req.header('authorization')
    const token = authheder?.split(' ')[1]
    if (token == null) {
      console.log('masalah')
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }
    const result = verifyAccessToken(token, CONFIG.secret.token) as jwtPayloadInterface
    if (result == null) {
      console.log('masalah 3')
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }
    req.user = result
    // res.data(result)

    res.set('user', result.userId)
    next()
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
