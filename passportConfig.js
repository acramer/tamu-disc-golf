const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        if (!/\S+@\S+\.\S+/.test(email)){
            return done(null, false, { message: "Please enter a valid email address" });
        }
        pool.query(
            `select * from users where email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    throw err;
                }
                if (results.rows.length > 0) {
                    const user = results.rows[0];
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err){
                            throw err;
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Email Password Combination is incorrect" });
                        }
                    });
                } else {
                    return done(null, false, { message: "Email Password Combination is incorrect" });
                }
            }
        );
    };
    
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => done(null,user.id));

    passport.deserializeUser((id, done) => {
        pool.query(
            `select * from users where id = $1`,
            [id],
            (err, results) => {
                if (err) {
                    throw err;
                }
                return done(null, results.rows[0]);
            }
        );
    });
};


module.exports = initialize;
