import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'
import { excampleCRUDModel, type excampleCRUDAtributes } from '../../models/excampleModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { CONSOLE } from '../../utilities/log'

export const createExcampleCrud = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as excampleCRUDAtributes

  const emptyfield = RequestChecker({
    requireList: ['excample_name'],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }
  try {
    requestBody.excample_id = uuidv4()
    await excampleCRUDModel.create(requestBody)

    const response = ResponseData.default
    const result = { message: 'success' }
    response.data = result
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
