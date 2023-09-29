import { userAuthorization } from './authHendler'
import { autoDeleteRow } from './aotoDeletRow'
import { isAdmin, isSuperAdmin } from './accessHendler'

export const middelware = {
  userAuthorization,
  autoDeleteRow,
  isAdmin,
  isSuperAdmin

}
