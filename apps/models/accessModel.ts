import { type Model, DataTypes } from 'sequelize'
import { sequelize } from '.'

export interface accessAtributes {
  id: number
  role: string
  acces_token: string | null
  user_id: string
  remember_me: number
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
    role: {
      type: DataTypes.ENUM('Admin', 'Super Admin'),
      defaultValue: 'Admin'
    },
    acces_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false

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
    freezeTableName: true,
    underscored: true,
    engine: 'InnoDB'
  }
)
