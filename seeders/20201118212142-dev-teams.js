'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('teams', [
    { 
      'team_name': 'Team 1',
      'member_name': 'Chandler Kramer',
      'team_id': '1'
    },
    {  'team_name': 'Team 1',
       'member_name': 'Michael T Taylor',
       'team_id': '1'
    },
    { 'team_name': 'Team 1',
    'member_name': 'Drew Fitzwater',
    'team_id': '1'
    },
    { 'team_name': 'Team 1',
    'member_name': 'Scottie Taylor',
    'team_id': '1'
    },
    { 'team_name': 'Team 2',
      'member_name': 'Nathan Crosby',
      'team_id': '2'
    },
    { 'team_name': 'Team 2',
      'member_name': 'Garrison Thomas',
      'team_id': '2'
    },
    { 'team_name': 'Team 2',
      'member_name': 'Caleb Zuniga',
      'team_id': '2'
    },
    { 'team_name': 'Team 2',
      'member_name': 'Jacob Bright',
      'team_id': '2'
    }
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
