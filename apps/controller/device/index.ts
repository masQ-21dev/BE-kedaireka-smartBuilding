import { createDevice } from './create'
import { findAllDevice, findOneByDeviceId } from './find'
import { removeDevice } from './remove'
import { updateDevice } from './update'

export const deviceCobtroller = {
  findAll: findAllDevice,
  findOne: findOneByDeviceId,
  create: createDevice,
  update: updateDevice,
  remove: removeDevice
}
