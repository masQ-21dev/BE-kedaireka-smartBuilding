import bcrypt from 'bcrypt'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const hashPasword = async (plainText: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(plainText, salt)
}
