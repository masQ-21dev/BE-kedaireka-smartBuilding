import { type Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { sensorModel } from './sensorModel'

export interface atributes {
  id: number
  atribute_name: string
  atribute_value: string
  sensor_id: number
}

interface atributesInstance
  extends Model<atributes>,
  atributes {}

export const inputAtributesModel = sequelize.define<atributesInstance>(
  'input_atribute',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    atribute_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    atribute_value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sensor_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: sensorModel,
        key: 'id'
      }
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'input_atribute',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)

export const outputAtributesModel = sequelize.define<atributesInstance>(
  'output_atribute',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    atribute_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    atribute_value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sensor_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: sensorModel,
        key: 'id'
      }
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'output_atribute',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
