import { type Response } from 'express'
import { excampleCRUDModel, type excampleCRUDAtributes } from '../../models/excampleModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { CONSOLE } from '../../utilities/log'

export const updateExclampleCrud = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as excampleCRUDAtributes

  const emptyfield = RequestChecker({
    requireList: ['excample_id'],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await excampleCRUDModel.findOne({
      where: {
        deleted_at: { [Op.eq]: 0 },
        excample_id: { [Op.like]: requestBody.excample_id }
      }
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: excampleCRUDAtributes | any = {
      ...(requestBody.excample_name.length > 0 && {
        excample_name: requestBody.excample_name
      })
    }

    await excampleCRUDModel.update(newData, {
      where: {
        deleted_at: { [Op.eq]: 0 },
        excample_id: { [Op.like]: requestBody.excample_id }
      }
    })

    const response = ResponseData.default
    const message = { message: 'success' }
    response.data = message
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
