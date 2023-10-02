'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sensor_payload', [{
      sensor_name: 'DHT-11',
      sensor_type: 'input'
    },
    {
      sensor_name: 'accelerometer',
      sensor_type: 'input'
    }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sensor_payload', null, {})
  }
}
