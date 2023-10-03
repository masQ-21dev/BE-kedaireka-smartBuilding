import { createDevice } from './create'
import { findAllDevice, findOneByDeviceId } from './find'

export const deviceCobtroller = {
  findAll: findAllDevice,
  findOne: findOneByDeviceId,
  create: createDevice
}
