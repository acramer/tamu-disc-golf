'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'role', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'position', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'about', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'profile_pic', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'role'),
      queryInterface.removeColumn('users', 'position'),
      queryInterface.removeColumn('users', 'about'),
      queryInterface.removeColumn('users', 'profile_pic'),
    ]);
  }
};
