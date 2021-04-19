'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('teams', [
    { 
      'team_name': 'Team 1',
      'member_name1': 'Chandler Kramer',
      'member_name2': 'Michael T Taylor',
      'member_name3': 'Scottie Taylor',
      'member_name4': 'Drew Fitzwater',
      'image_path': 'images/teams/image1.jpg'
    },
    { 'team_name': 'Team 2',
      'member_name1': 'Nathan Crosby',
      'member_name2': 'Garrison Thomas',
      'member_name3': 'Caleb Zuniga',
      'member_name4': 'Jacob Bright',
      'image_path': 'images/teams/image2.jpg'
    }
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
  }
};

