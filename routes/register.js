var express = require('express')
var router = express.Router();
var path = require('path')

const bcrypt = require("bcrypt");

const { pool } = require("../dbConfig");
const { checkAuth, checkNotAuth } = require("../authConfig.js");

router.get('/', checkAuth, (req,res) => {
    admin = false;
    profile_pic = '';
    if (req.user) {
      admin = req.user.role === 'admin';
      profile_pic = req.user.profile_pic;
    }
    res.render("register", { auth: req.isAuthenticated(), admin: admin, profile_pic: profile_pic });
});


router.post('/', async (req,res) => {
    let { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ message: "Missing Fields" });
    }

    if (!/\S+@\S+\.\S+/.test(email)){
        errors.push({ message: "Please enter a valid email address" });
    }

    if (password.length <= 6) {
        errors.push({ message: "Passwords must be longer than 6 characters" });
    }

    if (password != password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        res.render('register',{errors});
    }else{
        let hashedPassword = await bcrypt.hash(password, 10);
        profile_pic = "images/officers/officerplaceholder.png"
        pool.query(
            `select * from users
             where email = $1`,
             [email],
             (err, results)=>{
                if (err) {
                    throw err;
                }

                if (results.rows.length > 0) {
                    errors.push({ message: "Email already registered" });
                    res.render('register',{errors});
                }else{
                    pool.query(
                        `insert into users (name, email, password, profile_pic)
                         values ($1, $2, $3, $4)`,
                         [name,email,hashedPassword,profile_pic],
                         (err, results)=>{
                            if (err) {
                                throw err;
                            }
                            req.flash('success_msg', 'Registration Successful');
                            res.redirect('/login');
                         }
                    );
                }
             }
        );
    }
});

module.exports = router
