/* eslint-disable @typescript-eslint/explicit-function-return-type */
import bcrypt from 'bcrypt'

export const comaparePassword = async (password: string, hashPassword: string) => {
  return bcrypt.compareSync(password, hashPassword)
}
