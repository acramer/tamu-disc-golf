var express = require('express');
var router = express.Router();
var path = require('path');
var Sequelize = require('sequelize');
const db = require('../models/index.js');

const { checkAuth, checkNotAuth, checkNotAdmin } = require("../authConfig.js");

const multer = require("multer");

const events_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "views/images/events/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const events_upload = multer({ storage: events_storage });

const officers_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "views/images/officers/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const officers_upload = multer({ storage: officers_storage });

const teams_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "views/images/teams/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const teams_upload = multer({ storage: teams_storage });

router.get('/', checkNotAdmin, async (req,res) => {
  var events;
  var officers;
  var teams;
  await db.events.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['event_date', 'DESC']]
  }).then(events_obj => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    events = events_obj;
  });
  await db.officers.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['name', 'ASC']]
  }).then(officers_obj => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    officers = officers_obj;
  });
  await db.teams.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
  .then(teams_obj => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    teams = teams_obj;
    res.render('admin', { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, events: events, officers: officers, teams: teams });
  });
});

router.post('/event_add', checkNotAdmin, events_upload.single('file'), async (req, res) => {
  await db.events.create({
    event_title: req.body['title'], 
    event_date: req.body['date_time'], 
    event_place: req.body['place'], 
    event_description: req.body['description'],
    image_path: "images/events/" + req.file.originalname
  })
  .then( (result) => {
    res.json(result);
  });
});

router.put('/event_edit', checkNotAdmin, events_upload.single('file'), async (req, res) => {
  await db.events.update({
    event_title: req.body['title'], 
    event_date: req.body['date_time'], 
    event_place: req.body['place'], 
    event_description: req.body['description'],
    image_path: "images/events/" + req.file.originalname
  }, {
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.delete('/event_delete', checkNotAdmin, async (req, res) => {
  await db.events.destroy({
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.post('/officer_add', checkNotAdmin, officers_upload.single('file'), async (req, res) => {
  await db.officers.create({
    name: req.body['name'], 
    about: req.body['about'], 
    email: req.body['email'], 
    position: req.body['position'],
    image_path: "images/officers/" + req.file.originalname
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.post('/team_add', checkNotAdmin, teams_upload.single('file'), async (req, res) => {
  await db.teams.create({
    team_name: req.body['team_name'], 
    member_name1: req.body['member_name1'], 
    member_name2: req.body['member_name2'], 
    member_name3: req.body['member_name3'],
    member_name4: req.body['member_name4'],
    image_path: "images/teams/" + req.file.originalname
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.put('/officer_edit', checkNotAdmin, officers_upload.single('file'), async (req, res) => {
  await db.officers.update({
    name: req.body['name'], 
    about: req.body['about'], 
    email: req.body['email'], 
    position: req.body['position'],
    image_path: "images/officers/" + req.file.originalname
  }, {
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.put('/team_edit', checkNotAdmin, teams_upload.single('file'), async (req, res) => {
  await db.teams.update({
    team_name: req.body['team_name'], 
    member_name1: req.body['member_name1'], 
    member_name2: req.body['member_name2'], 
    member_name3: req.body['member_name3'],
    member_name4: req.body['member_name4'],
    image_path: "images/teams/" + req.file.originalname
  }, {
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.delete('/officer_delete', checkNotAdmin, async (req, res) => {
  await db.officers.destroy({
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

router.delete('/team_delete', checkNotAdmin, async (req, res) => {
  await db.teams.destroy({
    where: {id: req.body['id']} 
  })
  .then( (result) => {
      res.json(result) 
  });
});

module.exports = router