var express = require('express')
var router = express.Router();
var path = require('path')

router.get('/', (req,res) => {
    req.logOut();
    req.flash("success_msg", "You have successfully logged out");
    res.redirect("/login");
});

module.exports = router
