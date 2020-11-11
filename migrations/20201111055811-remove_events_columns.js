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
      queryInterface.removeColumn('events', 'createdAt'),
      queryInterface.removeColumn('events', 'updatedAt')
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
      queryInterface.addColumn('events', 'createdAt', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn('events', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      })
    ]);
  }
};
