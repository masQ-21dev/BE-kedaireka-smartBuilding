/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { payloadController } from '../controller'

export const payloadRoute = (app: Express) => {
  const route = express.Router()
  app.use('/api/v2/payload/sensor', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await payloadController.sensorGet(req, res)
  )

  route.post(
    '/',
    async (req: Request, res: Response) => await payloadController.sensorCreate(req, res)
  )
}
