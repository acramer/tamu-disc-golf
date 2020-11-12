var express = require('express')
var router = express.Router();
var path = require('path')
const db = require('../models/index.js')

router.get('/', (req, res) => {
  db.officers.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
  .then(officers => {
    res.render('officers', { officers: officers });
  });
});


module.exports = router
