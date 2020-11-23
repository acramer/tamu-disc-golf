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
    res.render("editprofile", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, user: req.user });
});

router.post('/', async (req,res) => {
    let { name, email, about } = req.body;
    let id = req.user.id;

    let errors = [];

    if (!name) {
        errors.push({ message: "Missing Fields" });
    }

    if (!email ) {
        errors.push({ message: "Missing Fields" });
    }

    if (!/\S+@\S+\.\S+/.test(email)){
        errors.push({ message: "Please enter a valid email address" });
    }

    if (errors.length > 0) {
        req.flash('error', errors[0].message);
        res.redirect('/editprofile');
    }else{
        pool.query(
            `select * from users
             where email = $1
             and not id = $2
             `,
             [email, id],
             (err, results)=>{
                if (err) {
                    throw err;
                }

                if (results.rows.length > 0) {
                    req.flash('error', 'Email registered with another user');
                    res.redirect('/editprofile');
                }else{
                    pool.query(
                         `update users set
                          name=$1,
                          email=$2,
                          about=$3
                          where id=$4`,
                         [name, email, about, id],
                         (err, results)=>{
                            if (err) {
                                throw err;
                            }
                            req.flash('success_msg', 'Profile Update Successful');
                            res.redirect('/profile');
                         }
                    );
                }
            }
        );
    }
});



module.exports = router
