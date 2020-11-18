var express = require('express')
var router = express.Router();
var path = require('path')

router.get( '/', (req, res) => {
  //res.render(path.resolve('views/lostfound'));
  db.users.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    where: { [Op.or]: [ { role: 'admin' }, { role: 'officer' } ] },
  })
  .then(officers => {
    res.render('officers', { officers: officers });
  });
  res.render('lostfound');
});

module.exports = router
