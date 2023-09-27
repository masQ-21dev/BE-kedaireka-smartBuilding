/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const { baseModel } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_table', {
      ...baseModel,
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('User', 'Admin', 'Super Admin'),
        defaultValue: 'User'
      },
      email_verified: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_table')
  }
}
