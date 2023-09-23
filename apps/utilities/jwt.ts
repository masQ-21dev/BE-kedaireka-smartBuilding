/* eslint-disable @typescript-eslint/no-invalid-void-type */
import jwt from 'jsonwebtoken'

export interface jwtPayloadInterface {
  userId: string
  role: string | undefined
}

export const generateAccessToken = (username: jwtPayloadInterface, secretToken: any, expiresIn: string): any => {
  return jwt.sign(username, secretToken, {
    expiresIn
  })
}
export const generateToken = (user: { id: any }, secretToken: any, expiresIn: string): any => {
  console.log('ini masalah 2')
  return jwt.sign(user, secretToken, {
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
