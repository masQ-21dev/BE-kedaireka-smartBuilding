/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const { baseModel } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('device_table', {
      ...baseModel,
      device_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      device_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mac_adress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      }
    })
      .then(async () => {
        await queryInterface.addConstraint('device_table', {
          fields: ['user_id'],
          type: 'foreign key',
          references: {
            table: 'user_table',
            field: 'user_id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('device_table')
  }
}
