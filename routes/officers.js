var express = require('express')
var router = express.Router();
var path = require('path')
var Sequelize = require('sequelize')
const db = require('../models/index.js')
const Op = Sequelize.Op

router.get('/', (req, res) => {
  db.users.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    where: { [Op.or]: [ { role: 'admin' }, { role: 'officer' } ] },
  })
  .then(officers => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render('officers', { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, officers: officers });
  });
});


module.exports = router
