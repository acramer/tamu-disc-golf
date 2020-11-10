var express = require('express')
var router = express.Router();
var path = require('path')

router.get( '/', function( req, res, next ) {
  // res.sendFile(path.resolve('client/lostfound.html') ) ;
  res.render(path.resolve('views/lostfound'), {});
} ) ;

module.exports = router
