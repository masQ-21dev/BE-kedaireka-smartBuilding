import { type Response } from 'express'

export const findAllUser = async function (req: any, res: Response): Promise<any> {
  return res.send('ok')
}

export const findOneUserByUserId = async function (req: any, res: Response): Promise<any> {
  return res.send('ok')
}
