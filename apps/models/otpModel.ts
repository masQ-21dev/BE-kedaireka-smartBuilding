/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type Model, DataTypes } from 'sequelize'
import { sequelize } from '.'

export interface otpAtributes {
  id: number
  email: string
  otp: string
  tokenexpires: string
}

interface otpInstance extends Model<otpAtributes>, otpAtributes {}

export const otpModels = sequelize.define<otpInstance>(
  'otp_table',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tokenexpires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now() + 43200
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'otp_table',
    deletedAt: false,
    freezeTableName: true,
    underscored: true,
    engine: 'InnoDB'
  }
)
