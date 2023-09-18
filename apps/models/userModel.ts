import { type Model, type Optional, UUIDV4, DataTypes } from 'sequelize'
import { sequelize } from '.'
import { type baseAtributes, baseModel } from './baseModel'

export interface userAtributes extends baseAtributes {
  user_id: string
  user_name: string
  user_email: string
  password: string
  email_verified: number
}

type userCreationAtributes = Optional<
userAtributes,
'id' | 'created_at' | 'updated_at'
>

interface userInstance
  extends Model<userAtributes, userCreationAtributes>,
  userAtributes {}

export const userModel = sequelize.define<userInstance>(
  'user_table',
  {
    ...baseModel,
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_verified: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'user_table',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
