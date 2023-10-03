/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { deviceCobtroller } from '../../controller'

export const deviceRouter = (app: Express) => {
  const route = express.Router()

  app.use('/api/v2/device', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await deviceCobtroller.findAll(req, res)
  )

  route.get(
    '/detail/:id',
    async (req: Request, res: Response) => await deviceCobtroller.findOne(req, res)
  )

  route.post(
    '/',
    async (req: Request, res: Response) => await deviceCobtroller.create(req, res)
  )
}
