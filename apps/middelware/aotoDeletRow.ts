import { type Response, type NextFunction } from 'express'
import { CONSOLE } from '../utilities/log'
import { ResponseData } from '../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { otpModels } from '../models/otpModel'
import { Op } from 'sequelize'

export const autoDeleteRow = async function (req: any, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log(new Date(Date.now()))
    await otpModels.destroy({
      where: {
        tokenexpires: { [Op.lte]: new Date(Date.now()) }
      }
    })

    next()
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
