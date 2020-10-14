var PORT = process.env.PORT || 2000 //process.env.port is the port for heroku
var express = require('express')

var http = require('http')

const app = module.exports = express();

app.use('/client', express.static(__dirname + '/client'))

app.get('/', function(req, res) {
    res.redirect('/client/index.html');
})

console.log(__dirname)

module.exports = app;
if (!module.parent) {
  http.Server(app).listen(PORT, function(){
    console.log('Server listening on port '+PORT+', congratulations.');
    console.log('http://localhost:'+PORT);
  });
}
