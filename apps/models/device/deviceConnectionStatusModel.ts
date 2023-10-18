import { type Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { deviceModel } from './deviceModel'

export interface DeviceConnectioStatusAtributes {
  id: number
  device_id: string
  connection_status: string
}

interface DeviceConnectioStatusInstance
  extends Model<DeviceConnectioStatusAtributes>,
  DeviceConnectioStatusAtributes {}

export const deviceConnectioStatusModel = sequelize.define<DeviceConnectioStatusInstance>(
  'device_connection_status',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    device_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: deviceModel,
        key: 'device_id'
      }
    },
    connection_status: {
      type: DataTypes.ENUM('connect', 'disconnect'),
      defaultValue: 'disconnect'
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'device_connection_status',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
