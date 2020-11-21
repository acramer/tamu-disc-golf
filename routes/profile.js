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
    res.render("profile", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, user: req.user });
});

router.post('/update_profile_pic', async (req,res) => {
    let { profile_pic } = req.body;
    let id = req.user.id;

    let auth = req.auth
    let admin = req.admin
    let user = req.user

    let errors = [];

    if (errors.length > 0) {
        req.flash('error', errors[0]);
        res.redirect('/profile');
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
                req.flash('success_msg', '"Profile Picture" Field Change Successful');
                res.redirect('/profile');
             }
        );
    }
});

router.post('/update_name', async (req,res) => {
    let { name } = req.body;
    let id = req.user.id;

    let auth = req.auth
    let admin = req.admin
    let profile_pic = req.profile_pic
    let user = req.user

    let errors = [];

    if (!name) {
        errors.push({ message: "Missing Fields" });
    }

    if (errors.length > 0) {
        req.flash('error', errors[0]);
        res.redirect('/profile');
    }else{
        pool.query(
             `update users
              set name=$1
              where id=$2`,
             [name, id],
             (err, results)=>{
                if (err) {
                    throw err;
                }
                req.flash('success_msg', '"Name" Field Change Successful');
                res.redirect('/profile');
             }
        );
    }
});

router.post('/update_about', async (req,res) => {
    let { about } = req.body;
    let id = req.user.id;

    let auth = req.auth
    let admin = req.admin
    let profile_pic = req.profile_pic
    let user = req.user

    let errors = [];

    if (errors.length > 0) {
        req.flash('error', errors[0]);
        res.redirect('/profile');
    }else{
        pool.query(
             `update users
              set about=$1
              where id=$2`,
             [about, id],
             (err, results)=>{
                if (err) {
                    throw err;
                }
                req.flash('success_msg', '"About" Field Change Successful');
                res.redirect('/profile');
             }
        );
    }
});

router.post('/update_email', async (req,res) => {
    let { email } = req.body;
    let id = req.user.id;

    let auth = req.auth
    let admin = req.admin
    let profile_pic = req.profile_pic
    let user = req.user

    let errors = [];

    if (!email ) {
        errors.push({ message: "Missing Fields" });
    }

    if (!/\S+@\S+\.\S+/.test(email)){
        errors.push({ message: "Please enter a valid email address" });
    }

    if (errors.length > 0) {
        req.flash('error', errors[0]);
        res.redirect('/profile');
    }else{
        pool.query(
            `select * from users
             where email = $1`,
             [email],
             (err, results)=>{
                if (err) {
                    throw err;
                }

                if (results.rows.length > 0) {
                    req.flash('error', 'Emailed already registered');
                    res.redirect('/profile');
                }else{
                    pool.query(
                        `update users
                         set email = $1
                         where id=$2`,
                         [email, id],
                         (err, results)=>{
                            if (err) {
                                throw err;
                            }
                            req.flash('success_msg', 'Registraion Successful');
                            res.redirect('/profile');
                         }
                    );
                }
        });
    }
});

router.post('/update_password', async (req,res) => {
    let { current_password, password, password2 } = req.body;
    let id = req.user.id;
    let old_hashed_password = req.user.password;

    let auth = req.auth
    let admin = req.admin
    let profile_pic = req.profile_pic
    let user = req.user

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
        res.redirect('/profile');
    }else{
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(old_hashed_password);
        console.log(hashedPassword);

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
                res.redirect('/profile');
            }
        });
    }
});


module.exports = router
