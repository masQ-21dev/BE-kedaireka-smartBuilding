/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'

import { excampleCrudController } from '../controller'
import { middelware } from '../middelware'

export const excampleCRUDRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/api/v2/excample-crud', middelware.userAuthorization, route)

  route.get(
    '/',
    async (req: Request, res: Response) => await excampleCrudController.findAll(req, res)
  )

  route.get(
    '/detail/:excample_id',
    async (req: Request, res: Response) => await excampleCrudController.findOne(req, res)
  )

  route.post(
    '/',
    async (req: Request, res: Response) => await excampleCrudController.create(req, res)
  )

  route.patch(
    '/',
    async (req: Request, res: Response) => await excampleCrudController.update(req, res)
  )

  route.delete(
    '/',
    async (req: Request, res: Response) => await excampleCrudController.remove(req, res)
  )
}
