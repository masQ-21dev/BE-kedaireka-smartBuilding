import { type Response } from 'express'
import { ResponseData } from '../../utilities/response'
import { CONSOLE } from '../../utilities/log'
import { StatusCodes } from 'http-status-codes'
import { deviceModel } from '../../models/device/deviceModel'
import { sensorModel } from '../../models/device/sensorModel'
import { Op } from 'sequelize'
import { RequestChecker } from '../../utilities/requestChecker'

// import { inputAtributesModel, outputAtributesModel } from '../../models/device/atributeModel'

export const findAllDevice = async function (req: any, res: Response): Promise<any> {
  try {
    const result = await deviceModel.findAll({
      where: {
        deleted_at: { [Op.eq]: 0 },
        ...(Boolean(req.body.search) && {
          [Op.or]: [{ device_name: { [Op.like]: `%${req.query.search}%` } }]
        })
      },
      include: {
        model: sensorModel,
        as: 'sensor'
        // include: [{
        //   model: inputAtributesModel,
        //   as: 'inputAtributes'
        // }, {
        //   model: outputAtributesModel,
        //   as: 'outputAtributes'
        // }]
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

export const findOneByDeviceId = async function (req: any, res: Response): Promise<any> {
  const requestParam = req.params

  const emptyfield = RequestChecker({
    requireList: ['id'],
    requestData: requestParam
  })

  if (emptyfield.length > 0) {
    const response = ResponseData.error(`unable to process request! error( ${emptyfield})`)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await deviceModel.findOne({
      where: {
        deleted_at: { [Op.eq]: 0 },
        device_id: { [Op.like]: requestParam.id }
      },
      include: {
        model: sensorModel,
        as: 'sensor'
        // include: [{
        //   model: inputAtributesModel,
        //   as: 'inputAtributes'
        // }, {
        //   model: outputAtributesModel,
        //   as: 'outputAtributes'
        // }]
      }
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
