/* eslint-disable @typescript-eslint/no-var-requires */
const Sequelize = require('sequelize')

const baseModel = {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  deletedAt: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
}

module.exports = { baseModel }
