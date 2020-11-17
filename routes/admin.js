var express = require('express')
var router = express.Router();
var path = require('path')

const { checkAuth, checkNotAuth } = require("../authConfig.js");

router.get('/', (req,res) => {
    res.render("admin");
});

module.exports = router
