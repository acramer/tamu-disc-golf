var express = require('express');
var router = express.Router();
var path = require('path');
var Sequelize = require('sequelize');
const db = require('../models/index.js');

const { checkAuth, checkNotAuth, checkNotAdmin } = require("../authConfig.js");

router.get('/', checkNotAdmin, (req,res) => {
  var events;
  db.events.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['event_date', 'DESC']]
  }).then(events_obj => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    events = events_obj
  });
  db.officers.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['name', 'ASC']]
  }).then(officers => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render('admin', { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, events: events, officers: officers });
  });
});

router.post('/event_add', checkNotAdmin, (req, res) => {
  db.events.create({
    event_title: req.body['title'], 
    event_date: req.body['date_time'], 
    event_place: req.body['place'], 
    event_description: req.body['description']
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.put('/event_edit', checkNotAdmin, (req, res) => {
  db.events.update({
    event_title: req.body['title'], 
    event_date: req.body['date_time'], 
    event_place: req.body['place'], 
    event_description: req.body['description']
  }, {
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.delete('/event_delete', checkNotAdmin, (req, res) => {
  db.events.destroy({
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.post('/officer_add', checkNotAdmin, (req, res) => {
  db.officers.create({
    name: req.body['name'], 
    about: req.body['about'], 
    email: req.body['email'], 
    position: req.body['position']
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.put('/officer_edit', checkNotAdmin, (req, res) => {
  db.officers.update({
    name: req.body['name'], 
    about: req.body['about'], 
    email: req.body['email'], 
    position: req.body['position']
  }, {
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.delete('/officer_delete', checkNotAdmin, (req, res) => {
  db.officers.destroy({
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

module.exports = router
