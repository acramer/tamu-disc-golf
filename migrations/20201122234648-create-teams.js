'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team_name: {
        type: Sequelize.STRING
      },
      team_id: {
        type: Sequelize.INTEGER
      },
      member_name1: {
        type: Sequelize.STRING
      },
      member_name2: {
        type: Sequelize.STRING
      },
      member_name3: {
        type: Sequelize.STRING
      },
      member_name4: {
        type: Sequelize.STRING
      },
      member_name5: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};