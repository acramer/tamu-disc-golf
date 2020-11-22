var express = require('express')
var router = express.Router();
var path = require('path')

const bcrypt = require("bcrypt");

const { pool } = require("../dbConfig");
const { checkAuth, checkNotAuth } = require("../authConfig.js");

router.get('/', checkNotAuth, (req,res) => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render("editprofilepic", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, user: req.user });
});
router.post('/', async (req,res) => {
    let { profile_pic } = req.body;
    let id = req.user.id;

    let auth = req.auth
    let admin = req.admin
    let user = req.user

    let errors = [];

    if (errors.length > 0) {
        req.flash('error', errors[0].message);
        res.redirect('/editprofilepic');
    }else{
        pool.query(
             `update users
              set profile_pic=$1
              where id=$2`,
             [profile_pic, id],
             (err, results)=>{
                if (err) {
                    throw err;
                }
                req.flash('success_msg', 'Profile Picture Change Successful');
                res.redirect('/profile');
             }
        );
    }
});

module.exports = router
