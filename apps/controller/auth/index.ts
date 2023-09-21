import { emailVerifiController, requestEmailVerivicattion } from './emailVerifi'
import { loginController } from './login'
import { refressToken } from './refressToken'
import { registerControler } from './register'

export const authControler = {
  register: registerControler,
  login: loginController,
  verifyEmail: emailVerifiController,
  requestVerifyEmail: requestEmailVerivicattion,
  refressToken
}
