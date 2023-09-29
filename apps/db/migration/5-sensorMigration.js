/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const { baseModel } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sensor_table', {
      ...baseModel,
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      sensor_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      device_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      sensor_type: {
        typeL: Sequelize.ENUM('Input', 'Output'),
        allowNull: true
      }
    })
      .then(async () => {
        await queryInterface.addConstraint('sensor_table', {
          fields: ['device_id'],
          type: 'foreign key',
          references: {
            table: 'device_table',
            field: 'device_id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sensor_table')
  }
}
