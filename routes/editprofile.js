var express = require('express')
var router = express.Router();
var path = require('path')

const { checkAuth, checkNotAuth } = require("../authConfig.js");

router.get('/', checkNotAuth, (req,res) => {
    res.render("editprofile", {user: req.user.name});
});

module.exports = router
