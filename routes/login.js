var express = require('express')
var router = express.Router();
var path = require('path')

const { pool } = require("../dbConfig");
const { checkAuth, checkNotAuth } = require("../authConfig.js");

router.get('/', checkAuth, (req,res) => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render("login", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic  });
});

module.exports = router
