var express = require('express')
var router = express.Router();
var path = require('path')
var Sequelize = require('sequelize')
const db = require('../models/index.js')
const Op = Sequelize.Op

router.get('/', (req, res) => {
  db.teams.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
  .then(
    teams => {
    res.render('teams', { teams: teams });
  });
});

module.exports = router
