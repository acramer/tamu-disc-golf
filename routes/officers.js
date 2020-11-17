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
    res.render('officers', { officers: officers });
  });
});


module.exports = router
