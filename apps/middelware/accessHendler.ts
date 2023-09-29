import { type Response, type NextFunction } from 'express'
import { type jwtPayloadInterface } from '../utilities/jwt'
import { CONSOLE } from '../utilities/log'
import { ResponseData } from '../utilities/response'
import { StatusCodes } from 'http-status-codes'
// import { userModel } from '../models/userModel'
// import { Op } from 'sequelize'

export const isAdmin = async function (req: any, res: Response, next: NextFunction): Promise<any> {
  const requestUser = req.user as jwtPayloadInterface
  try {
    if (requestUser.role === 'Admin' || requestUser.role === 'Super Admin') {
      next(); return
    }

    console.log('ini')
    const response = ResponseData.error('Missing Authorization. ini')
    return res.status(StatusCodes.UNAUTHORIZED).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const isSuperAdmin = async function (req: any, res: Response, next: NextFunction): Promise<any> {
  const requestUser = req.user as jwtPayloadInterface
  try {
    if (requestUser.role === 'Super Admin') { next(); return }

    const response = ResponseData.error('Missing Authorization.')
    return res.status(StatusCodes.UNAUTHORIZED).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
