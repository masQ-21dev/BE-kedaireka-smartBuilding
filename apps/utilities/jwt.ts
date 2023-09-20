/* eslint-disable @typescript-eslint/no-invalid-void-type */
import jwt from 'jsonwebtoken'
import { CONFIG } from '../config'

export interface jwtPayloadInterface {
  userId: string
  role: string | undefined
}

export const generateAccessToken = (username: jwtPayloadInterface, expiresIn: string): any => {
  return jwt.sign(username, CONFIG.secret.token ?? '', {
    expiresIn
  })
}

export const verifyAccessToken = (token: any, secretToken: any): any => {
  try {
    return jwt.verify(token, secretToken)
  } catch (error) {
    return null
  }
}
