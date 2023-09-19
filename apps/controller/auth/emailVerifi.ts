import { type Response } from 'express'

export const emailVerifiController = async function (req: any, res: Response): Promise<any> {
  return res.send('ok')
}
