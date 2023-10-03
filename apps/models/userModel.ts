import { type Model, type Optional, UUIDV4, DataTypes } from 'sequelize'
import { sequelize } from '.'
import { type baseAtributes, baseModel } from './baseModel'
import { type accessAtributes, accessModel } from './accessModel'
import { type deviceAtributes, deviceModel } from './device/deviceModel'

export interface userAtributes extends baseAtributes {
  user_id: string
  user_name: string
  user_email: string
  password: string
  role: string
  email_verified: number
}

type userCreationAtributes = Optional<
userAtributes,
'id' | 'created_at' | 'updated_at'
>

interface userInstance
  extends Model<userAtributes, userCreationAtributes>,
  userAtributes {
  access: accessAtributes
  device: deviceAtributes
}

export const userModel = sequelize.define<userInstance>(
  'user_table',
  {
    ...baseModel,
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: UUIDV4(),
      unique: true
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
    role: {
      type: DataTypes.ENUM('User', 'Admin', 'Super Admin'),
      defaultValue: 'User'
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
userModel.hasOne(accessModel, { foreignKey: 'user_id', sourceKey: 'user_id', as: 'access' })
accessModel.belongsTo(userModel, { foreignKey: 'user_id', as: 'access' })

userModel.hasMany(deviceModel, { foreignKey: 'user_id', sourceKey: 'user_id', as: 'device' })
deviceModel.belongsTo(userModel, { foreignKey: 'user_id', as: 'device' })
