import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'
import { userModel, type userAtributes } from '../../models/userModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { CONSOLE } from '../../utilities/log'
import { Op } from 'sequelize'
import { hashPasword } from '../../utilities/scurePassword'

export const createUser = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as userAtributes

  const emptyfield = RequestChecker({
    requireList: ['user_name', 'user_email', 'password'],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const emialChek = await userModel.findAll({
      raw: true,
      where: {
        deleted_at: { [Op.eq]: 0 },
        user_email: { [Op.like]: requestBody.user_email }
      }
    })
    if (emialChek.length > 0) {
      const message = `Email ${requestBody.user_email} has been used, use other emial !`
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    requestBody.user_id = uuidv4()
    requestBody.password = await hashPasword(requestBody.password)
    await userModel.create(requestBody)

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
