var express = require('express')
var router = express.Router();
var path = require('path')

const bcrypt = require("bcrypt");

const { pool } = require("../dbConfig");
const { checkAuth, checkNotAuth } = require("../authConfig.js");

router.get('/', checkNotAuth, (req,res) => {
    res.redirect('/profile');
});
router.get('/profile_pic', checkNotAuth, (req,res) => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render("editprofile", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, user: req.user, edit_profile_pic: true });
});
router.get('/profile', checkNotAuth, (req,res) => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render("editprofile", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, user: req.user, edit_profile: true });
});
router.get('/changepassword', checkNotAuth, (req,res) => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render("editprofile", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, user: req.user, changepassword: true });
});
router.get('/delete', checkNotAuth, (req,res) => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render("editprofile", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, user: req.user, delete_profile: true });
});

router.post('/profile_pic', async (req,res) => {
    let { profile_pic } = req.body;
    let id = req.user.id;

    let auth = req.auth
    let admin = req.admin
    let user = req.user

    let errors = [];

    if (errors.length > 0) {
        req.flash('error', errors[0]);
        res.redirect('/editprofile/profile_pic');
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

router.post('/profile', async (req,res) => {
    let { name, about } = req.body;
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
        req.flash('error', errors[0]);
        res.redirect('/editprofile/profile');
    }else{
        pool.query(
            `select * from users
             where email = $1
             and where not id = $2
             `,
             [email, id],
             (err, results)=>{
                if (err) {
                    throw err;
                }

                if (results.rows.length > 0) {
                    req.flash('error', 'Emailed registered with another user');
                    res.redirect('/editprofile/profile');
                }else{
                    pool.query(
                         `update users
                          set name=$1
                          set email=$2
                          set about=$3
                          where id=$4`,
                         [name, email, about, id],
                         (err, results)=>{
                            if (err) {
                                throw err;
                            }
                            req.flash('success_msg', 'Profile Updated Successful');
                            res.redirect('/profile');
                         }
                    );
                }
            }
        );
    }
});

router.post('/changepassword', async (req,res) => {
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
        res.redirect('/editprofile/changepassword');
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
                res.redirect('/editprofile/changepassword');
            }
        });
    }
});

router.post('/delete', async (req,res) => {
    let { current_password, password, password2 } = req.body;
    let id = req.user.id;
    let old_hashed_password = req.user.password;

    let errors = [];

    if ( !password ) {
        errors.push({ message: "Missing Fields" });
    }

    if (errors.length > 0) {
        req.flash('error', errors[0].message);
        res.redirect('/editprofile/delete');
    }else{
        let hashedPassword = await bcrypt.hash(password, 10);
        bcrypt.compare(password, old_hashed_password, (err, isMatch) => {
            if (err){throw err;}
            if (isMatch) {
                pool.query(`select from users where role='admin' and id=$1`, [id], (err, results)=>{
                        if (err) {throw err;}
                        // Is the user an admin
                        if (results.rows.length>0) {
                            pool.query(`select from users where role=$1`, ['admin'], (err, results)=>{
                                    if (err) {throw err;}
                                    // Is the user the only admin
                                    if (results.rows.length==1) {
                                        req.flash('error', 'Cannot Delete Only Admin Account');
                                        res.redirect('/editprofile/delete');
                                    } else {
                                        req.logOut();
                                        pool.query(`delete from users where id=$1`, [id], (err, results)=>{
                                                if (err) {throw err;}
                                                req.flash('success_msg', 'Profile Successfully Deleted');
                                                res.redirect('/login');
                                        });
                                    }
                            });
                        } else {
                            req.logOut();
                            pool.query(`delete from users where id=$1`, [id], (err, results)=>{
                                    if (err) {throw err;}
                                    req.flash('success_msg', 'Profile Successfully Deleted');
                                    res.redirect('/login');
                            });
                        }
                });
            } else {
                req.flash('error', 'Password is incorrect');
                res.redirect('/editprofile/delete');
            }
        });
    }
});


module.exports = router
