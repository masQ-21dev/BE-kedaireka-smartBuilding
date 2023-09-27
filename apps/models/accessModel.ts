import { type Model, DataTypes } from 'sequelize'
import { sequelize } from '.'
import { userModel } from './userModel'

export interface accessAtributes {
  id?: number
  acces_token?: string | null
  user_id: string
  remember_me?: number
}

interface accessInstance extends Model<accessAtributes>, accessAtributes {}

export const accessModel = sequelize.define<accessInstance>(
  'access_table',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    acces_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: userModel,
        key: 'user_id'
      }
    },
    remember_me: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'access_table',
    deletedAt: false,
    paranoid: true,
    freezeTableName: true,
    underscored: true,
    engine: 'InnoDB'
  }
)
