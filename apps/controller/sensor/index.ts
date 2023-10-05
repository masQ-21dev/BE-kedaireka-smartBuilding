import { createSensor } from './create'
import { findAllSensor, findSensorByDeviceId, findSensorById } from './find'
import { removeSensor } from './remove'

export const sensorController = {
  findAll: findAllSensor,
  findAllByIdDevice: findSensorByDeviceId,
  findOne: findSensorById,
  create: createSensor,
  update: 'aku',
  delete: removeSensor
}
