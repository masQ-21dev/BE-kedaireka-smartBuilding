import { DataTypes, Sequelize } from 'sequelize'

export const baseModel = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deleted_at: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
}

export interface baseAtributes {
  id: number
  created_at: string
  updated_at: string | null
  deleted_at: number
}
