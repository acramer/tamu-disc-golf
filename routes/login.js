var express = require('express')
var router = express.Router();
var path = require('path')

const { pool } = require("../dbConfig");
const { checkAuth, checkNotAuth } = require("../authConfig.js");

router.get('/', checkAuth, (req,res) => {
    res.render("login");
});

module.exports = router
