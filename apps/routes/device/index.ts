import { type Express } from 'express'
import { deviceRouter } from './deviceRoute'
import { sensorRouter } from './sensorRoute'

// export const routerDevice = {
//   device: deviceRouter,
//   sensor: sensorRouter
// }

export const routerDevice = async (app: Express): Promise<any> => {
  deviceRouter(app)
  sensorRouter(app)
}
