import { type Response } from 'express'
import { Pagination } from '../../utilities/pagination'
import { userModel, type userAtributes } from '../../models/userModel'
import { ResponseData } from '../../utilities/response'
import { RequestChecker } from '../../utilities/requestChecker'
import { CONSOLE } from '../../utilities/log'
import { Op } from 'sequelize'
import { StatusCodes } from 'http-status-codes'

export const findAllUser = async function (req: any, res: Response): Promise<any> {
  const user = req.user
  console.log(user)
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )

    const result = await userModel.findAndCountAll({
      where: {
        deleted_at: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ user_name: { [Op.like]: `%${req.query.search}%` } }]
        })
      },
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.default
    response.data = page.data(result)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findOneUserByUserId = async function (req: any, res: Response): Promise<any> {
  const requestParam = req.params as userAtributes

  const emptyfield = RequestChecker({
    requireList: ['user_id'],
    requestData: requestParam
  })

  if (emptyfield.length > 0) {
    const message = `Unable to process request error(${emptyfield})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }

  try {
    const result = await userModel.findOne({
      where: {
        deleted_at: { [Op.eq]: 0 },
        user_id: { [Op.eq]: requestParam.user_id }
      }
    })
    if (result == null) {
      const response = ResponseData.default
      response.data = result
      return res.status(StatusCodes.OK).json(response)
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
