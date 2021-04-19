'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events', [
        {   'event_title':'New Member Orientation',
            'event_date':'2020-10-16 5:30 PM',
            'event_place':'Texas A&M Campus',
            'event_description':'Are you a new member to the Disc Golf Club? Join the orientation to know more about the club and its policies.',
            'image_path':'images/events/i1.jpg',

        },
        {   'event_title': 'Social Event',
            'event_date': '2020-10-17 5:00 PM',
            'event_place': 'Texas A&M Campus',
            'event_description': 'Join us for a social event with Disc Golf members. Discuss about Golf, connect with people, and enjoy some great food.',
            'image_path':'images/events/i2.jpg',

        },
        {   'event_title':'Guest Lecture',
            'event_date':'2020-10-19 11:00 AM',
            'event_place':'MSC Texas A&M Campus',
            'event_description':'Want to know more about becoming a Disc Golf Champ? Come and join us for a guest lecture by a former champion.',
            'image_path':'images/events/i3.jpg',

        },
        {   'event_title': 'National Championship',
            'event_date': '2020-11-15 11:00 AM',
            'event_place': 'Texas A&M Campus',
            'event_description': 'Witness our Aggies compete in the annual national championship',
            'image_path':'images/events/i4.jpg',

        },
        {   'event_title': 'New Member Orientation',
            'event_date': '2020-11-27 5:30 PM',
            'event_place': 'Texas A&M Campus',
            'event_description': 'Are you a new member to the Disc Golf Club? Join the orientation to know more about the club and its policies.',
            'image_path':'images/events/i1.jpg',

        },
        {   'event_title': 'Social Event',
            'event_date': '2020-11-28 5:00 PM',
            'event_place': 'Texas A&M Campus',
            'event_description': 'Join us for a social event with Disc Golf members. Discuss about Golf, connect with people, and enjoy some great food.',
            'image_path':'images/events/i2.jpg',

        },
        {   'event_title': 'Guest Lecture',
            'event_date': '2020-12-12 11:00 AM',
            'event_place': 'MSC Texas A&M Campus',
            'event_description': 'Want to know more about becoming a Disc Golf Champ? Come and join us for a guest lecture by a former champion.',
            'image_path':'images/events/i3.jpg',

        },
        {   'event_title': 'National Championship',
            'event_date': '2020-12-02 11:00 AM',
            'event_place': 'Texas A&M Campus',
            'event_description': 'Witness our Aggies compete in the annual national championship',
            'image_path':'images/events/i4.jpg',
        },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {})
  },
};
