var express = require('express');
var router = express.Router();
var fs = require('fs');

fs.readdirSync(__dirname).forEach( function(route){
    route = route.split('.')[0];
    if (route === 'index') return;
    if (route === 'landing') {
        router.use('/', require('./'+route+'.js'));
        return;
    }
    router.use('/'+route, require('./'+route+'.js'));
});

module.exports = router;
