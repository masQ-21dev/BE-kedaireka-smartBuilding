/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express, type Request, type Response } from 'express'
import { resetPasswordController } from '../controller'
import { middelware } from '../middelware'

export const resetPasswordRoute = (app: Express) => {
  const route = express.Router()
  // app.use(
  //   async (req: Request, res: Response, next: NextFunction) => await middelware.autoDeleteRow(req, res, next)
  // )
  app.use('/api/v2/reset_password', middelware.autoDeleteRow, route)

  route.post(
    '/',
    async (req: Request, res: Response) => await resetPasswordController.request(req, res)
  )

  route.post(
    '/verify',
    async (req: Request, res: Response) => await resetPasswordController.verify(req, res)
  )

  route.patch(
    '/',
    middelware.userAuthorization,
    async (req: Request, res: Response) => await resetPasswordController.resetPassword(req, res)
  )
}
