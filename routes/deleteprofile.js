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
    res.render("deleteprofile", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic, user: req.user });
});

router.post('/', async (req,res) => {
    let { current_password, password } = req.body;
    let id = req.user.id;
    let old_hashed_password = req.user.password;

    let errors = [];

    if ( !password ) {
        errors.push({ message: "Missing Fields" });
    }

    if (password.length <= 6) {
        errors.push({ message: "Passwords must be longer than 6 characters" });
    }

    if (errors.length > 0) {
        req.flash('error', errors[0].message);
        res.redirect('/deleteprofile');
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
                                        res.redirect('/deleteprofile');
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
                res.redirect('/deleteprofile');
            }
        });
    }
});


module.exports = router
