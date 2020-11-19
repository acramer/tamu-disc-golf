var express = require('express')
var router = express.Router();
var path = require('path')
var Sequelize = require('sequelize')
const db = require('../models/index.js')

router.get( '/', (req, res) => {
  //res.render(path.resolve('views/lostfound'));
  db.lost_and_founds.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
  })
  .then(lost_and_found => {
    res.render('lostfound', { lost_and_found: lost_and_found });
  });
//   res.render('lostfound');
});

router.post('/add', (req, res) => {
    console.log(req.body)
    console.log('THIS IS USER ID' + req.body['user_id'])
    db.lost_and_founds.create({
    title: req.body['title'], 
    details: req.body['details'], 
    email: req.body['email'], 
    phone: req.body['number'],
    user_id: req.body['user_id'],
    })
    .then( (result) => {
        res.json(result) 
    });
});


module.exports = router
