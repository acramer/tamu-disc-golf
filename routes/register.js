var express = require('express')
var router = express.Router();
var path = require('path')

const bcrypt = require("bcrypt");

const { pool } = require("../dbConfig");
const { checkAuth, checkNotAuth } = require("../authConfig.js");

router.get('/', checkAuth, (req,res) => {
    res.render("register");
});


router.post('/', async (req,res) => {
    let { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ message: "Please enter all fields." });
    }

    if (password.length < 6) {
        errors.push({ message: "Please enter a password longer than 6 characters." });
    }

    if (password != password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        res.render('register',{errors});
    }else{
        let hashedPassword = await bcrypt.hash(password, 10);
        pool.query(
            `select * from users
             where email = $1`,
             [email],
             (err, results)=>{
                if (err) {
                    throw err;
                }

                if (results.rows.length > 0) {
                    errors.push({ message: "User already exists" });
                    res.render('register',{errors});
                }else{
                    pool.query(
                        `insert into users (name, email, password)
                         values ($1, $2, $3)`,
                         [name,email,hashedPassword],
                         (err, results)=>{
                            if (err) {
                                throw err;
                            }
                            req.flash('success_msg', 'You are now registered. Please log in.');
                            res.redirect('/login');
                         }
                    );
                }
             }
        );
    }
});

module.exports = router