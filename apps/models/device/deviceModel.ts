import { type Model, type Optional, UUIDV4, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { type baseAtributes, baseModel } from '../baseModel'
import { type sensorAtributes, sensorModel } from './sensorModel'
import { userModel } from '../userModel'

export interface deviceAtributes extends baseAtributes {
  device_id: string
  device_name: string
  mac_adress: string
  ip: string
  user_id: string
}

type deviceCreationAtributes = Optional<
deviceAtributes,
'id' | 'created_at' | 'updated_at'
>

interface deviceInstance
  extends Model<deviceAtributes, deviceCreationAtributes>,
  deviceAtributes {
  sensor: sensorAtributes
}

export const deviceModel = sequelize.define<deviceInstance>(
  'device_table',
  {
    ...baseModel,
    device_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4(),
      unique: true
    },
    device_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mac_adress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: userModel,
        key: 'user_id'
      }
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'device_table',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)

deviceModel.hasMany(sensorModel, { foreignKey: 'device_id', sourceKey: 'device_id', as: 'sensor' })
sensorModel.belongsTo(deviceModel, { foreignKey: 'device_id', as: 'sensor' })
