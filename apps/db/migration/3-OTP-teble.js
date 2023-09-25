/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('otp_table', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tokenexpires: {
        type: Sequelize.DATE,
        allowNull: false
        // defaultValue: Sequelize.fn('now')
      }
    })
    //   .then(async () => {
    //     await queryInterface.addConstraint('otp_table', {
    //       fields: ['user_id'],
    //       type: 'foreign key',
    //       references: {
    //         table: 'user_table',
    //         field: 'user_id'
    //       },
    //       onDelete: 'cascade',
    //       onUpdate: 'cascade'
    //     })
    //   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('otp_table')
  }
}
