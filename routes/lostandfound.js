var express = require('express')
var router = express.Router();
var path = require('path')
var Sequelize = require('sequelize')
const db = require('../models/index.js')

const multer = require("multer");

const lostfound_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "views/images/lostfound/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const lostfound_upload = multer({ storage: lostfound_storage });

router.get( '/', async (req, res) => {
  //res.render(path.resolve('views/lostfound'));
  await db.lost_and_founds.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
  })
  .then(lost_and_found => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render('lostfound', { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, lost_and_found: lost_and_found });
  });
//   res.render('lostfound');
});

router.post('/add', lostfound_upload.single('file'), async (req, res) => {
    await db.lost_and_founds.create({
      title: req.body['title'], 
      details: req.body['details'], 
      email: req.body['email'], 
      phone: req.body['number'],
      user_id: req.body['user_id'],
      image_path: "images/lostfound/" + req.file.originalname
    })
    .then( (result) => {
        res.json(result) 
    });
});


module.exports = router
