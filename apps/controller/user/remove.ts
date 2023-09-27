import { type Response } from 'express'
import { userModel, type userAtributes } from '../../models/userModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { CONSOLE } from '../../utilities/log'

export const removeUser = async function (req: any, res: Response): Promise<any> {
  const requestQuery = req.query as userAtributes

  const emptyfield = RequestChecker({
    requireList: ['user_id'],
    requestData: requestQuery
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
        user_id: { [Op.eq]: requestQuery.user_id }
      }

    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }
    result.deleted_at = 1
    void result.save()

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
