/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('device_connection_status', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      device_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      connection_status: {
        type: Sequelize.ENUM('connect', 'disconnect'),
        defaultValue: 'disconnect'
      }
    })
      .then(async () => {
        await queryInterface.addConstraint('device_connection_status', {
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
    await queryInterface.dropTable('device_connection_status')
  }
}
