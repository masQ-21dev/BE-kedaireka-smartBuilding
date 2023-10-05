/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express, type Request, type Response } from 'express'
import { sensorController } from '../../controller/sensor'

export const sensorRouter = (app: Express) => {
  const route = express.Router()

  app.get(
    '/api/v2/device/sensor',
    async (req: Request, res: Response) => await sensorController.findAllByIdDevice(req, res)
  )
  app.use('/api/v2/sensor', route)

  route.get(
    '/all',
    async (req: Request, res: Response) => await sensorController.findAll(req, res)
  )
  route.get(
    '/detail/:id',
    async (req: Request, res: Response) => await sensorController.findOne(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await sensorController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await sensorController.findAll(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await sensorController.delete(req, res)
  )
}
