import { type Response } from 'express'
import { sensorModel, type sensorAtributes } from '../../models/device/sensorModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { CONSOLE } from '../../utilities/log'

export const removeSensor = async function (req: any, res: Response): Promise<any> {
  const requestQuery = req.query as sensorAtributes

  const emptyfield = RequestChecker({
    requireList: ['id'],
    requestData: requestQuery
  })

  if (emptyfield.length > 0) {
    const response = ResponseData.error(`unable to process request! error( ${emptyfield})`)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await sensorModel.findByPk(requestQuery.id)

    if (result == null) {
      const message = 'sensor not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }
    await result.destroy()

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
