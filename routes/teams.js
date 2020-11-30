var express = require('express')
var router = express.Router();
var path = require('path')
var Sequelize = require('sequelize')
const db = require('../models/index.js')
const Op = Sequelize.Op

router.get( '/', (req, res) => {
  db.teams.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
  .then(teams => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
   res.render('teams', { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, teams: teams });
  });
});

module.exports = router
