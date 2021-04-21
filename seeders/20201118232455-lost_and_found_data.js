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
   await queryInterface.bulkInsert('lost_and_founds', [
       {
            details: 'This is a test details where I am describing where I found the disc and how to contact me', 
            title: 'Example Title',
            email: 'test@test.edu',
            phone: '123-456-7890',
            user_id: null,
            image_path: 'prod-images/lostfound/lostfound.jpg'
        },
        {
            details: 'Very few details', 
            title: 'Title Title Title',
            email: 'test@test.edu',
            phone: '123-456-7890',
            user_id: null,
            image_path: 'prod-images/lostfound/lostfound.jpg'
        },
        {
            details: 'Hi', 
            title: 'Title123123123123123',
            email: 'tamu@tamu.edu',
            phone: '123-456-7890',
            user_id: null,
            image_path: 'prod-images/lostfound/lostfound.jpg'
        }
], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('lost_and_founds', null, {})
  }
};
