import { emailVerifiController } from './emailVerifi'
import { loginController } from './login'
import { registerControler } from './register'

export const authControler = {
  register: registerControler,
  login: loginController,
  verifiEmail: emailVerifiController
}
