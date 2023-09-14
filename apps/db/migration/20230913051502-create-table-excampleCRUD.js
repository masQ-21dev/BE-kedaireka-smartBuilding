'use strict';

const { baseModel } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('excample_tabel', {
      ...baseModel, 
      excample_id  : {
        type: Sequelize.STRING(100),
        allowNull : false
      },
      excample_name  : {
        type : Sequelize.STRING(225),
        allowNull : false
      }
     });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('excample_tabel');
  }
};
