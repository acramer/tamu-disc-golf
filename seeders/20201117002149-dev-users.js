'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      { 'name': 'Ben Mueck',
        'email': 'bmueck@tamu.edu',
        'password': '$2b$10$y0UrG1f.EuTsRZ2DlzaMfOVp5G3xsCkOzqU2TMG3lob/1p6GQPWeC',
        'role' : 'admin',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'President',
        'profile_pic' : 'images/officers/officerplaceholder.png',
      },
      { 'name': 'Sam Mueck',
        'email': 'sam@abc.com',
        'password': '$2b$10$y0UrG1f.EuTsRZ2DlzaMfOVp5G3xsCkOzqU2TMG3lob/1p6GQPWeC',
        'role' : 'officer',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'Treasurer',
        'profile_pic' : 'images/officers/officerplaceholder.png',
      },
      { 'name': 'Michael T Taylor',
        'email': 'michael@abc.com',
        'password': '$2b$10$y0UrG1f.EuTsRZ2DlzaMfOVp5G3xsCkOzqU2TMG3lob/1p6GQPWeC',
        'role' : 'officer',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'Team Captain',
        'profile_pic' : 'images/officers/officerplaceholder.png',
      },
      { 'name': 'Scottie Taylor',
        'email': 'scottie@abc.com',
        'password': '$2b$10$y0UrG1f.EuTsRZ2DlzaMfOVp5G3xsCkOzqU2TMG3lob/1p6GQPWeC',
        'role' : 'officer',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'General Officer 1',
        'profile_pic' : 'images/officers/officerplaceholder.png',
      },
      { 'name': 'Parker Primm',
        'email': 'parker@abc.com',
        'password': '$2b$10$y0UrG1f.EuTsRZ2DlzaMfOVp5G3xsCkOzqU2TMG3lob/1p6GQPWeC',
        'role' : 'officer',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'General Officer 2',
        'profile_pic' : 'images/officers/officerplaceholder.png',
      },
      { 'name': 'Joker',
        'email': 'joker@abc.com',
        'password': '$2b$10$y0UrG1f.EuTsRZ2DlzaMfOVp5G3xsCkOzqU2TMG3lob/1p6GQPWeC',
        'role' : 'officer',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': 'placeholder',
        'profile_pic' : 'images/officers/officerplaceholder.png',
      },
      { 'name': 'NotAnOfficer',
        'email': 'notanofficer@abc.com',
        'password': '$2b$10$y0UrG1f.EuTsRZ2DlzaMfOVp5G3xsCkOzqU2TMG3lob/1p6GQPWeC',
        'role' : 'member',
        'about': 'Madness is like gravity, all it needs is a little push',
        'position': '',
        'profile_pic' : 'images/officers/officerplaceholder.png',
      },
      { 'name': 'TestUser',
        'email': 'testuser@testuser.com',
        'password': '$2b$10$y0UrG1f.EuTsRZ2DlzaMfOVp5G3xsCkOzqU2TMG3lob/1p6GQPWeC',
        'role' : 'member',
        'about': 'testuser about',
        'position': 'testuser position',
        'profile_pic' : 'images/officers/officerplaceholder.png',
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
     return queryInterface.bulkDelete('users', null, {})
  }
};
