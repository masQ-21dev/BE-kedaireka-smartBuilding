/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextFunction, type Express, type Request, type Response } from 'express'
import { excampleCRUDRoutes } from './excampleCRUDRoute'
import { ResponseData } from '../utilities/response'
import { StatusCodes } from 'http-status-codes'
import { CONSOLE } from '../utilities/log'
import { authRouter } from './authRoute'
import { userRoutes } from './userRoute'
import { resetPasswordRoute } from './resetPasswordRoute'
import { middelware } from '../middelware'

export const appRouterV2 = async (app: Express): Promise<any> => {
  app.use(
    async (req: Request, res: Response, next: NextFunction) => await middelware.autoDeleteRow(req, res, next)
  )
  app.get(
    '/api/v2',
    async (req: Request, res: Response) => {
      try {
        const data = {
          message: 'Welcome to Smart Building API v2'
        }
        const response = ResponseData.default
        response.data = data
        return res.status(StatusCodes.OK).json(response)
      } catch (error: any) {
        CONSOLE.error(error.message)

        const message = `unable to process request! error ${error.message}`
        const response = ResponseData.error(message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
      }
    }
  )

  excampleCRUDRoutes(app)
  authRouter(app)
  userRoutes(app)
  resetPasswordRoute(app)
}
