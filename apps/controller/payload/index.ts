import { addSensorPayload, getSensorPayload } from './sensorpayloadController'

export const payloadController = {
  sensorGet: getSensorPayload,
  sensorCreate: addSensorPayload
}
