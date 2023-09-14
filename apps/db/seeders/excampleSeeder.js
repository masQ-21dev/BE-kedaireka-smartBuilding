'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('excample_tabel', [{
      excample_id: '659d1dac-c1be-4a6c-bdee-7c72bd0d9778',
      excample_name: 'hello world 1'
    },
    {
      excample_id: 'b4e2d28f-f43b-48aa-8108-f5491844b6bd',
      excample_name: 'hello world 2'
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('excample_tabel', null, {})
  }
}
