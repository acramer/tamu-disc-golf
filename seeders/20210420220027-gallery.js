'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('gallery_images', [
      {
        'image_path': 'https://tdg-prod-images.s3-us-west-1.amazonaws.com/gallery/dg1.jpg',
        'title': 'Events',
        'description': 'Explore our several events'
      },
      {
        'image_path': 'https://tdg-prod-images.s3-us-west-1.amazonaws.com/gallery/dg2.jpg',
        'title': 'Courses',
        'description': 'Explore the nearby courses'
      },
      {
        'image_path': 'https://tdg-prod-images.s3-us-west-1.amazonaws.com/gallery/dg3.jpg',
        'title': 'Contact',
        'description': 'Contact our officers'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('gallery_images', null, {})
  }
};
