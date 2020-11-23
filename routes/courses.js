var express = require('express')
var router = express.Router();
var path = require('path')
var Sequelize = require('sequelize')
const db = require('../models/index.js')
const Op = Sequelize.Op

router.get('/', (req, res) => {
  admin = false;
  profile_pic = '';
  if (req.user) {
    admin = req.user.role === 'admin';
    profile_pic = req.user.profile_pic;
  }
  db.courses.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['rating', 'DESC']],
    limit: 30
  })
  .then(courses => {
    res.render('courses', { courses: courses, auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic });
  });

});


module.exports = router
