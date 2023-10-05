import { type Response } from 'express'
import { userModel, type userAtributes } from '../../models/userModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { CONSOLE } from '../../utilities/log'
import { Op } from 'sequelize'

export const updateUser = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as userAtributes

  const emptyfield = RequestChecker({
    requireList: ['  '],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await userModel.findOne({
      where: {
        deleted_at: { [Op.eq]: 0 },
        user_id: { [Op.eq]: requestBody.user_id }
      }
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: userAtributes | any = {
      ...(Boolean(requestBody.user_name)) && {
        user_name: requestBody.user_name
      },
      ...(Boolean(requestBody.role)) && {
        role: requestBody.role
      },
      updated_at: new Date()
    }

    await userModel.update(newData, {
      where: {
        deleted_at: { [Op.eq]: 0 },
        user_id: { [Op.like]: requestBody.user_id }
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
