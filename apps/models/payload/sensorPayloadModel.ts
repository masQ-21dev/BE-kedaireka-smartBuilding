import { type Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export interface sensorPayloadInterface {
  id: number
  sensor_name: string
  sensor_type: string
  atributes: string | string[]
}

interface sensorPayloadInstance
  extends Model<sensorPayloadInterface>, sensorPayloadInterface {}

export const sensorPayloadModel = sequelize.define<sensorPayloadInstance>(
  'sensor_payload',
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
    sensor_type: {
      type: DataTypes.ENUM('input', 'output'),
      defaultValue: 'input'
    },
    atributes: {
      type: DataTypes.TEXT, // Menggunakan TEXT untuk menyimpan JSON sebagai string
      allowNull: false,
      get () {
        return JSON.parse(this.getDataValue('atributes') as string)
      },
      set (value: string[] | undefined) {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            this.setDataValue('atributes', JSON.stringify(value))
          } else {
            this.setDataValue('atributes', value)
          }
        }
      }
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'sensor_payload',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
