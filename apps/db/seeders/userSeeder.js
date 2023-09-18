'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('excample_tabel', [{
      userId: '80e39f50-1fc4-47ba-84aa-a220042b47dc',
      userName: 'admin test',
      userEmail: 'admin@test.com',
      password: 'aku kamu itera',
      emailVerified: 1
    }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('excample_tabel', null, {})
  }
}
