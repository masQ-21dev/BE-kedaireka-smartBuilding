import { type Response } from 'express'
import { sensorModel, type sensorAtributes } from '../../models/device/sensorModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { CONSOLE } from '../../utilities/log'
import { sensorPayloadModel } from '../../models/payload/sensorPayloadModel'
import { inputAtributesModel, type atributes, outputAtributesModel } from '../../models/device/atributeModel'

export const createSensor = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body
  requestBody.device_id = req.query.device_id

  const emptyfield = RequestChecker({
    requireList: ['device_id', 'sensor_name'],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const response = ResponseData.error(`unable to process request! error( ${emptyfield})`)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const sensorPayload = await sensorPayloadModel.findOne({
      where: {
        sensor_name: requestBody.sensor_name
      }
    })
    if (sensorPayload == null) {
      const response = ResponseData.error(`unable to process request! unsuport sensor type( ${requestBody.sensor_name} )`)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    const newSensor: sensorAtributes | any = {
      sensor_name: sensorPayload.sensor_name,
      device_id: requestBody.device_id,
      sensor_type: sensorPayload.sensor_type
    }

    const sensorCreared = await sensorModel.create(newSensor)

    for (const atribute of sensorPayload.atributes) {
      const atributeData: atributes = {
        atribute_name: atribute,
        sensor_id: sensorCreared.id
      }
      if (sensorPayload.sensor_type === 'input') { await inputAtributesModel.create(atributeData) } else { await outputAtributesModel.create(atributeData) }
    }

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
