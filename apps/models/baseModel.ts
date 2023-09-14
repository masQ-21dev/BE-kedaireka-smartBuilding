import { DataTypes, Sequelize } from 'sequelize'

const baseModel = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deletedAt: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
}

interface baseAtributes {
  id: number
  createdAt: string
  updatedAt: string | null
  deletedAt: number
}

export { baseModel, type baseAtributes }
