import jwt from 'jsonwebtoken'
import { CONFIG } from '../config'

export interface jwtPayloadInterface {
  userId: string
  role: 'Admin' | 'Super Admin'
}

export const generateAccessToken = (username: jwtPayloadInterface, expiresIn: string): any => {
  return jwt.sign(username, CONFIG.secret.token ?? '', {
    expiresIn
  })
}

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, CONFIG.secret.token ?? '')
  } catch {
    return false
  }
}
