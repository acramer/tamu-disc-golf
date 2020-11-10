var express = require('express')
var router = express.Router();
var path = require('path')
var Sequelize = require('sequelize')
const db = require('../models/index.js')
const Op = Sequelize.Op

// router.get( '/', (req, res) => {
//   //res.render(path.resolve('views/index'));
//   res.render('index');
// });
router.get('/', (req, res) => {
    db.events.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']},
      where: {event_date: {[Op.gt]: new Date()}},
      order: [['event_date', 'ASC']],
      limit: 3
    }).then(events => {
      res.render('index', { events: events });
    });
});

module.exports = router
