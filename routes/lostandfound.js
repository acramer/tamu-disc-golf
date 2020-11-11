var express = require('express')
var router = express.Router();
var path = require('path')

router.get( '/', (req, res) => {
  //res.render(path.resolve('views/lostfound'));
  res.render('lostfound');
});

module.exports = router
