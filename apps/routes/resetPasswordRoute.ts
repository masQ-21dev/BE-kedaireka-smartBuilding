/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express, type Request, type Response } from 'express'
import { resetPasswordController } from '../controller'

export const resetPasswordRoute = (app: Express) => {
  const route = express.Router()
  app.use('/api/v2/reset_password', route)

  route.post(
    '/',
    async (req: Request, res: Response) => await resetPasswordController.request(req, res)
  )

  route.post(
    '/verify',
    async (req: Request, res: Response) => await resetPasswordController.verify(req, res)
  )
}
