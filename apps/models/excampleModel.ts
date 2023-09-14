import { type Model, type Optional, UUIDV4, DataTypes } from 'sequelize'
import { sequelize } from '.'
import { type baseAtributes, baseModel } from './baseModel'

export interface excampleCRUD extends baseAtributes {
  excample_id: string
  excample_name: string
}

type excampleCRUDCreationAtributes = Optional<
excampleCRUD,
'id' | 'createdAt' | 'updatedAt'
>

interface excampleCRUDInstance
  extends Model<excampleCRUD, excampleCRUDCreationAtributes>,
  excampleCRUD {}

export const excampleCRUDModel = sequelize.define<excampleCRUDInstance>(
  'excample_tabel',
  {
    ...baseModel,
    excample_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    excample_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'excample_tabel',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
