import { type Response } from 'express'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { type excampleCRUDAtributes, excampleCRUDModel } from '../../models/excampleModel'
import { ResponseData } from '../../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { CONSOLE } from '../../utilities/log'
import { RequestChecker } from '../../utilities/requestChecker'

export const findAllExcampleCrud = async function (req: any, res: Response): Promise<any> {
  const user = req.user
  console.log(user)
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )

    const result = await excampleCRUDModel.findAndCountAll({
      where: {
        deleted_at: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ excample_name: { [Op.like]: `%${req.query.search}%` } }]
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

export const findOneexcampleCrud = async function (req: any, res: Response): Promise<any> {
  const requestParam = req.params as excampleCRUDAtributes

  const emptyfield = RequestChecker({
    requireList: ['excample_id'],
    requestData: requestParam
  })

  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }

  try {
    const result = await excampleCRUDModel.findOne({
      where: {
        deleted_at: { [Op.eq]: 0 },
        excample_id: { [Op.eq]: requestParam.excample_id }
      }
    })
    if (result == null) {
      const response = ResponseData.default
      response.data = { message: 'data not found' }
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
