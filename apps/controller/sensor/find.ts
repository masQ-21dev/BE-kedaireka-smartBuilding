import { type Response } from 'express'
import { CONSOLE } from '../../utilities/log'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { type sensorAtributes, sensorModel } from '../../models/device/sensorModel'
import { Op } from 'sequelize'
import { inputAtributesModel, outputAtributesModel } from '../../models/device/atributeModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { deviceModel } from '../../models/device/deviceModel'

export const findAllSensor = async function (req: any, res: Response): Promise<any> {
  try {
    const result = await sensorModel.findAll({
      where: {
        ...(Boolean(req.body.search) && {
          [Op.or]: [{ sensor_name: { [Op.like]: `%${req.query.search}%` } }]
        })
      },
      include: [{
        model: inputAtributesModel,
        as: 'inputAtributes'
      }, {
        model: outputAtributesModel,
        as: 'outputAtributes'
      }],
      order: [['id', 'asc']]
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

export const findSensorByDeviceId = async function (req: any, res: Response): Promise<any> {
  const requestQuery = req.query

  console.log(requestQuery.device_id)

  const emptyfield = RequestChecker({
    requireList: ['device_id'],
    requestData: requestQuery
  })

  if (emptyfield.length > 0) {
    const response = ResponseData.error(`unable to process request! error( ${emptyfield})`)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const isDevice = await deviceModel.findOne({
      raw: true,
      where: {
        deleted_at: { [Op.eq]: 0 },
        device_id: { [Op.like]: requestQuery.device_id }
      },
      attributes: ['device_id']
    })

    if (isDevice == null) {
      const response = ResponseData.error('NOT found')
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const result = await sensorModel.findAll({
      where: {
        device_id: { [Op.like]: requestQuery.device_id }
      },
      include: [{
        model: inputAtributesModel,
        as: 'inputAtributes'
      }, {
        model: outputAtributesModel,
        as: 'outputAtributes'
      }],
      order: [['id', 'asc']]
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

export const findSensorById = async function (req: any, res: Response): Promise<any> {
  const requestParam = req.params as sensorAtributes
  console.log(requestParam.id)

  const emptyfield = RequestChecker({
    requireList: ['id'],
    requestData: requestParam
  })

  if (emptyfield.length > 0) {
    const response = ResponseData.error(`unable to process request! error( ${emptyfield})`)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await sensorModel.findOne({
      where: {
        id: requestParam.id
      },
      include: [{
        model: inputAtributesModel,
        as: 'inputAtributes'
      }, {
        model: outputAtributesModel,
        as: 'outputAtributes'
      }]
    })

    if (result == null) {
      const response = ResponseData.error('NOT found')
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

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
