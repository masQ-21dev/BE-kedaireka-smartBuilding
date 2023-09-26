import { requestResetPassword } from './requestResetPassword'
import { resetPassword } from './resetPassword'
import { verifyOtp } from './verifyOtp'

export const resetPasswordController = {
  request: requestResetPassword,
  verify: verifyOtp,
  resetPassword
}
