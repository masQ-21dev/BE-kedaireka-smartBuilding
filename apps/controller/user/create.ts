import { type Response } from 'express'

export const createUser = async function (req: any, res: Response): Promise<any> {
  return res.send('ok')
}
