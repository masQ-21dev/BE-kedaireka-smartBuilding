/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express, type Request, type Response } from 'express'
import { userController } from '../controller'
export const userRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/api/v2/user', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await userController.findAll(req, res)
  )

  route.get(
    '/detail/:user_id',
    async (req: Request, res: Response) => await userController.findOne(req, res)
  )

  route.post(
    '/',
    async (req: Request, res: Response) => await userController.create(req, res)
  )

  route.patch(
    '/',
    async (req: Request, res: Response) => await userController.update(req, res)
  )

  route.delete(
    '/',
    async (req: Request, res: Response) => await userController.remove(req, res)
  )
}
