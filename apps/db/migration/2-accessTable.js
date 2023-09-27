/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('access_table', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      acces_token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      remember_me: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      }
    })
      .then(async () => {
        await queryInterface.addConstraint('access_table', {
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
    await queryInterface.dropTable('access_table')
  }
}
