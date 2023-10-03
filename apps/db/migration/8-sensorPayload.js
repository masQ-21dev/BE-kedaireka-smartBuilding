/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sensor_payload', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      sensor_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sensor_type: {
        type: Sequelize.ENUM('input', 'output'),
        defaultValue: 'input'
      },
      atributes: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sensor_payload')
  }
}
