/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'

import { authControler } from '../controller'

export const authRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v2/auth', route)

  route.get('/', async (req: Request, res: Response) => {
    return res.json({ message: 'ok' })
  })

  route.post(
    '/register',
    async (req: Request, res: Response) => await authControler.register(req, res)
  )

  route.post(
    '/login',
    async (req: Request, res: Response) => await authControler.login(req, res)
  )

  route.get(
    '/verifiemail',
    async (req: Request, res: Response) => await authControler.verifyEmail(req, res)
  )
  route.post(
    '/request_verification',
    async (req: Request, res: Response) => await authControler.requestVerifyEmail(req, res)
  )

  route.get(
    '/refress_token',
    async (req: Request, res: Response) => await authControler.refressToken(req, res)
  )
}
