import { requestResetPassword } from './requestResetPassword'
import { verifyOtp } from './verifyOtp'

export const resetPasswordController = {
  request: requestResetPassword,
  verify: verifyOtp
}
