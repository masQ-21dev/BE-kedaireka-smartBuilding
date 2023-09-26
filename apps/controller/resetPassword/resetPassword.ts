import { type Response } from 'express'
import { userModel, type userAtributes } from '../../models/userModel'
import { RequestChecker } from '../../utilities/requestChecker'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { hashPasword } from '../../utilities/scurePassword'

export const resetPassword = async function (req: any, res: Response): Promise<any> {
  const requestQuery = req.query as userAtributes

  const emptyfield = RequestChecker({
    requireList: ['user_email', 'password'],
    requestData: requestQuery
  })
  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield} )`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  const userData = await userModel.findOne({
    where: {
      deleted_at: { [Op.eq]: 0 },
      user_email: { [Op.like]: requestQuery.user_email }
    }
  })

  if (userData == null) {
    const message = `account with Email ${requestQuery.user_email} not registered, Please register first !`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.UNAUTHORIZED).json(response)
  }

  //   requestQuery.password = await hashPasword(requestQuery.password)

  userData.password = await hashPasword(requestQuery.password)

  await userData.save()

  //   await userData.update(requestQuery)

  return res.send(userData)
}
