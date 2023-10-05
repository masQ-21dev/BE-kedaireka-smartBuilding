import { type Response } from 'express'
import { deviceModel, type deviceAtributes } from '../../models/device/deviceModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { CONSOLE } from '../../utilities/log'
import { Op } from 'sequelize'

export const updateDevice = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as deviceAtributes
  requestBody.device_id = req.query.device_id
  console.log(req.query.device_id)
  const emptyfield = RequestChecker({
    requireList: ['device_id'],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const response = ResponseData.error(`unable to process request! error( ${emptyfield})`)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await deviceModel.findOne({
      where: {
        deleted_at: { [Op.eq]: 0 },
        device_id: { [Op.like]: requestBody.device_id }
      }
    })

    if (result == null) {
      const message = 'device not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: deviceAtributes | any = {
      ...(Boolean(requestBody.device_name)) && {
        device_name: requestBody.device_name
      },
      ...(Boolean(requestBody.mac_adress)) && {
        mac_adress: requestBody.mac_adress
      },
      ...(Boolean(requestBody.ip)) && {
        ip: requestBody.ip
      },
      updated_at: new Date()
    }

    console.log(newData)

    await deviceModel.update(newData, {
      where: {
        deleted_at: { [Op.eq]: 0 },
        device_id: { [Op.like]: requestBody.device_id }
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
