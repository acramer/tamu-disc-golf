var express = require('express')
var router = express.Router();
var path = require('path')

router.get( '/', function( req, res, next ) {
  // res.sendFile(path.resolve('client/teams.html') ) ;
  res.render(path.resolve('views/teams'), {})
} ) ;

module.exports = router
