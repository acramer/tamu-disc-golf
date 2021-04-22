'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('events', 'image_path', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('officers', 'image_path', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('lost_and_founds', 'image_path', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('teams', 'image_path', {
        type: Sequelize.STRING
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('events', 'image_path'),
      queryInterface.removeColumn('officers', 'image_path'),
      queryInterface.removeColumn('lost_and_founds', 'image_path'),
      queryInterface.removeColumn('teams', 'image_path')
    ]);
  }
};
