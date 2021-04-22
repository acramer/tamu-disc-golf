var express = require('express')
var router = express.Router();
var path = require('path')
var Sequelize = require('sequelize')
const db = require('../models/index.js')
const Op = Sequelize.Op

router.get('/', async (req, res) => {
    var items;
    var events;
    await db.events.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']},
      where: {event_date: {[Op.gt]: new Date()}},
      order: [['event_date', 'ASC']],
      limit: 3
    }).then(events_obj => {
      admin = false;
      profile_pic = '';
      if (req.user) {
        admin = req.user.role === 'admin';
        profile_pic = req.user.profile_pic;
      }
      events = events_obj;
    });
    await db.gallery_images.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']}
    }).then(items_obj => {
      admin = false;
      profile_pic = '';
      if (req.user) {
        admin = req.user.role === 'admin';
        profile_pic = req.user.profile_pic;
      }
      items = items_obj;
      res.render('index', { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, items: items, events: events });
    });
});

module.exports = router
