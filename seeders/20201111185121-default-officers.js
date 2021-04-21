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
    return queryInterface.bulkInsert('officers', [
      { 'name': 'Ben Mueck',
        'email': 'bmueck@tamu.edu',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'President',
        'image_path': 'prod-images/officers/officerplaceholder.png'
      },
      { 'name': 'Sam Mueck',
        'email': 'abc@abc.com',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'Treasurer',
        'image_path': 'prod-images/officers/officerplaceholder.png'
      },
      { 'name': 'Michael T Taylor',
        'email': 'abc@abc.com',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'Team Captain',
        'image_path': 'prod-images/officers/officerplaceholder.png'
      },
      { 'name': 'Scottie Taylor',
        'email': 'abc@abc.com',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'General Officer 1',
        'image_path': 'prod-images/officers/officerplaceholder.png'
      },
      { 'name': 'Parker Primm',
        'email': 'abc@abc.com',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'General Officer 2',
        'image_path': 'prod-images/officers/officerplaceholder.png'
      },
      { 'name': 'Joker',
        'email': 'abc@abc.com',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'placeholder',
        'image_path': 'prod-images/officers/officerplaceholder.png'
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('officers', null, {})
  }
};
