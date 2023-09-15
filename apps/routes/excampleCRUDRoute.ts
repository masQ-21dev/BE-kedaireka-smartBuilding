/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'

import { excampleCrudController } from '../controller/excampleCRUD'

export const excampleCRUDRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/api/v2/excalmpe-crud', route)

  route.get('/', async (req: Request, res: Response) => await excampleCrudController.findAll(req, res))
}
