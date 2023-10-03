import { type Response } from 'express'
import { deviceModel, type deviceAtributes } from '../../models/device/deviceModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { CONSOLE } from '../../utilities/log'
import { v4 as uuidv4 } from 'uuid'

export const createDevice = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as deviceAtributes
  requestBody.user_id = req.query.user_id

  const emptyfield = RequestChecker({
    requireList: ['device_name', 'mac_adress', 'ip', 'user_id'],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const response = ResponseData.error(`unable to process request! error( ${emptyfield})`)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    requestBody.device_id = uuidv4()
    await deviceModel.create(requestBody)

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
