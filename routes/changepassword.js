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
    res.render("changepassword", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, user: req.user  });
});

router.post('/', async (req,res) => {
    let { current_password, password, password2 } = req.body;
    let id = req.user.id;
    let old_hashed_password = req.user.password;

    let errors = [];

    if ( !current_password || !password || !password2 ) {
        errors.push({ message: "Missing Fields" });
    }

    if (password.length < 6) {
        errors.push({ message: "Passwords must be longer than 6 characters" });
    }

    if (password != password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        req.flash('error', errors[0].message);
        res.redirect('/changepassword');
    }else{
        let hashedPassword = await bcrypt.hash(password, 10);
        bcrypt.compare(current_password, old_hashed_password, (err, isMatch) => {
            if (err){
                throw err;
            }
            if (isMatch) {
                pool.query(
                    `update users
                     set password=$1
                     where id=$2`,
                     [hashedPassword, id],
                     (err, results)=>{
                        if (err) {
                            throw err;
                        }
                        req.flash('success_msg', 'Password Update Successful');
                        res.redirect('/profile');
                     }
                );
            } else {
                req.flash('error', 'Current Password is incorrect');
                res.redirect('/changepassword');
            }
        });
    }
});


module.exports = router
