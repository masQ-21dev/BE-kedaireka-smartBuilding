/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('input_atribute', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      atribute_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      atribute_value: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sensor_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      }

    })
      .then(async () => {
        await queryInterface.addConstraint('input_atribute', {
          fields: ['sensor_id'],
          type: 'foreign key',
          references: {
            table: 'sensor_table',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('input_atribute')
  }
}
