import { createUser } from './create'
import { findAllUser, findOneUserByUserId } from './find'
import { removeUser } from './remove'
import { updateUser } from './update'

export const userController = {
  create: createUser,
  findAll: findAllUser,
  findOne: findOneUserByUserId,
  remove: removeUser,
  update: updateUser
}
