import { type Response } from 'express'
import { CONSOLE } from '../../utilities/log'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { type sensorPayloadInterface, sensorPayloadModel } from '../../models/payload/sensorPayloadModel'
import { Op } from 'sequelize'
import { RequestChecker } from '../../utilities/requestChecker'

export const getSensorPayload = async function (req: any, res: Response): Promise<any> {
  try {
    const result = await sensorPayloadModel.findAll({
      where: {
        ...(Boolean(req.query.id) && {
          [Op.or]: [{ id: req.query.id }]
        }),
        ...(Boolean(req.query.name) && {
          [Op.or]: [{ sensor_name: { [Op.like]: `%${req.query.name}%` } }]
        })
      }
    })

    const response = ResponseData.default
    response.data = result
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const addSensorPayload = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as sensorPayloadInterface

  const emptyfield = RequestChecker({
    requireList: ['sensor_name', 'sensor_type'],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const response = ResponseData.error(`unable to process request! error( ${emptyfield} )`)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    await sensorPayloadModel.create(requestBody)

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
