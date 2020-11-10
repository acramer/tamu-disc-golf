var express = require('express')
var router = express.Router();
var path = require('path')

router.get( '/', function( req, res, next ) {
  // res.sendFile(path.resolve('client/officers.html') ) ;
  res.render(path.resolve('views/officers'), {})
} ) ;

module.exports = router
