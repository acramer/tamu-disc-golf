var express = require('express')
var router = express.Router();
var path = require('path')

router.get( '/', (req, res) => {
  //res.render(path.resolve('views/news'), {});
  res.render('news');
});

module.exports = router
