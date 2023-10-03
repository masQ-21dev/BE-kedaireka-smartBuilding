import { type Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { deviceModel } from './deviceModel'
import { type atributes, inputAtributesModel, outputAtributesModel } from './atributeModel'

export interface sensorAtributes {
  id: number
  sensor_name: string
  device_id: string
  sensor_type: string
}

interface deviceInstance
  extends Model<sensorAtributes>,
  sensorAtributes {
  inputAtributes?: atributes
  outputAtributes?: atributes
}

export const sensorModel = sequelize.define<deviceInstance>(
  'device_table',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    sensor_name: {
      type: DataTypes.STRING,
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
    sensor_type: {
      type: DataTypes.ENUM('input', 'output'),
      defaultValue: 'input'
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'sensor_table',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)

sensorModel.hasMany(inputAtributesModel, { foreignKey: 'sensor_id', sourceKey: 'id', as: 'inputAtributes' })
inputAtributesModel.belongsTo(sensorModel, { foreignKey: 'sensor_id', as: 'inputAtributes' })

sensorModel.hasMany(outputAtributesModel, { foreignKey: 'sensor_id', sourceKey: 'id', as: 'outputAtributes' })
outputAtributesModel.belongsTo(sensorModel, { foreignKey: 'sensor_id', as: 'outputAtributes' })
