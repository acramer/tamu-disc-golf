var express = require('express')

var router = express.Router();
var path = require('path')

router.get( '/', function( req, res, next) {
  // res.sendFile(path.resolve('client/index.html') ) ;
  res.render(path.resolve('views/index'), {})
} ) ;

module.exports = router
