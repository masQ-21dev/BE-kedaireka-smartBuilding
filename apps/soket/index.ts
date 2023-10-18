/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Server, type Socket } from 'socket.io'
import { CONFIG } from '../config'
import { deviceModel } from '../models/device/deviceModel'
import { Op } from 'sequelize'
import { deviceConnectioStatusModel } from '../models/device/deviceConnectionStatusModel'

const devMode = (CONFIG.appMode === 'dev')

const init = (io: Server) => {
  (global as any).io = io

  io.on('connection', async (socket: Socket) => {
    if (devMode)console.log(`device conented ${socket.id}`)

    const { deviceId } = socket.handshake.query

    try {
      if (deviceId) {
        const device = await deviceModel.findOne({
          where: {
            deleted_at: { [Op.eq]: 0 },
            device_id: deviceId
          }
        })
        if (device === null) socket.disconnect()

        const [deviceStatus, created] = await deviceConnectioStatusModel.findOrCreate({
          where: {
            device_id: deviceId
          }
        })

        if (devMode)console.log(created)
        deviceStatus.connection_status = 'connect'
        await deviceStatus.save()
      }
      // join room device
      if (deviceId) void socket.join('room:soket')
    } catch (error: any) {
      if (devMode)console.log(error)
      socket.disconnect()
    }

    // disconnect
    socket.on('disconnect', async () => {
      const [deviceStatus, created] = await deviceConnectioStatusModel.findOrCreate({
        where: {
          device_id: deviceId
        }
      })
      if (devMode)console.log(created)
      deviceStatus.connection_status = 'disconnect'
      await deviceStatus.save()
    })
  })
}

export default { init }
