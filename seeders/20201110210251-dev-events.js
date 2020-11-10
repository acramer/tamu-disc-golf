'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events', [
        {   'event_title':'Event One',
            'event_date': '2020-11-15 14:00:00 +02:00',
            'event_place': 'Event Location',
            'event_description': 'Event Description',
            'createdAt': '2020-11-15 14:00:00 +02:00',
            'updatedAt': '2020-11-15 14:00:00 +02:00',
        },
        {  'event_title':'Event Two',
            'event_date': '2020-11-17 14:00:00 +02:00',
            'event_place': 'Event Location',
            'event_description': 'Event Description',
            'createdAt': '2020-11-15 14:00:00 +02:00',
            'updatedAt': '2020-11-15 14:00:00 +02:00',
        },
        {   'event_title':'Event Three',
            'event_date': '2020-11-19 14:00:00 +02:00',
            'event_place': 'Event Location',
            'event_description': 'Event Description',
            'createdAt': '2020-11-15 14:00:00 +02:00',
            'updatedAt': '2020-11-15 14:00:00 +02:00',
        },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {})
  },
};
