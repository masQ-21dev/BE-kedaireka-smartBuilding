import { type Response } from 'express'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { verifyAccessToken } from '../../utilities/jwt'
import { CONFIG } from '../../config'
import { accessModel } from '../../models/accessModel'
import { Op } from 'sequelize'
import { CONSOLE } from '../../utilities/log'
// import { CONFIG } from '../../config'

export const emailVerifiController = async function (req: any, res: Response): Promise<any> {
  const requestQuery = req.query
  console.log(requestQuery)

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
    const resul = verifyAccessToken(requestQuery.id, CONFIG.secret.emailVerification)
    if (resul === null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    return res.json(requestQuery)
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
    const accessUser = await accessModel.findOne({
      raw: true,
      where: {
        user_id: { [Op.like]: requestQuery.user_id }
      }
    })

    if (accessUser == null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    return accessUser
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
