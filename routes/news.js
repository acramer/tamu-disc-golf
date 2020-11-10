var express = require('express')
var router = express.Router();
var path = require('path')

router.get( '/', function( req, res, next ) {
  // res.sendFile(path.resolve('client/news.html') ) ;
  res.render(path.resolve('views/news'), {})
} ) ;

module.exports = router
