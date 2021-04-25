var express = require('express')
var router = express.Router();
var path = require('path')
var Sequelize = require('sequelize')
const db = require('../models/index.js')

const multer = require("multer");
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3_bucket = 'tdg-prod-images'
const aws_url = 'https://tdg-prod-images.s3-us-west-1.amazonaws.com/'

const lostfound_storage = multerS3({
  s3: new aws.S3(),
  bucket: s3_bucket,
  acl:'public-read',
  metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
      cb(null, "lostfound/" + file.originalname);
  }
})
const lostfound_upload = multer({ storage: lostfound_storage });

router.get( '/', async (req, res) => {
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
});

router.post('/add', lostfound_upload.single('file'), async (req, res) => {
    await db.lost_and_founds.create({
      title: req.body['title'], 
      details: req.body['details'], 
      email: req.body['email'], 
      phone: req.body['number'],
      user_id: req.body['user_id'],
      image_path: aws_url + 'lostfound/' + req.file.originalname
    })
    .then( (result) => {
        res.json(result) 
    });
});


module.exports = router
