var PORT = process.env.PORT || 2000 //process.env.port is the port for heroku
var express = require('express')
var exphbs  = require('express-handlebars');
var fs = require('fs')
var path = require('path')
var http = require('http')
var Sequelize = require('sequelize')

var bcrypt = require('bcrypt');
var session = require('express-session');
var flash = require('express-flash');
var passport = require("passport");

// import { Loader } from "@googlemaps/js-api-loader"

const app = module.exports = express();

/*User Passport*/
const initializePassport = require("./passportConfig");
initializePassport(passport);
/*User Passport*/

app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const db = require('./models/index.js')
const Op = Sequelize.Op

var helpers = require('handlebars-helpers')();

/*User Passport*/
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
/*User Passport*/

//app.use(express.static(path.join(__dirname, 'views')));
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/mail', express.static(path.join(__dirname, 'views/mail')));
app.use('/vendor', express.static(path.join(__dirname, 'views/vendor')));
app.use('/images', express.static(path.join(__dirname, 'views/images')));
app.use(require('./routes/index.js'));

app.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
}));

module.exports = app;
if (!module.parent) {
  http.Server(app).listen(PORT, function(){
    console.log('Server listening on port '+PORT+', congratulations.');
    console.log('http://localhost:'+PORT);
  });
}
