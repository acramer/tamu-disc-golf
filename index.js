var PORT = process.env.PORT || 2000 //process.env.port is the port for heroku
var express = require('express')
var fs = require('fs')
var path = require('path')


var http = require('http')

const app = module.exports = express();

app.use(express.static(path.join(__dirname, 'client')))
app.use(require('./routes/index.js'));

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/client/index.html');
// })
// 
// app.get('/courses', function(req, res) {
//     res.sendFile(__dirname + '/client/courses.html');
// })
// 
// app.get('/officers', function(req, res) {
//     res.sendFile(__dirname + '/client/officers.html');
// })
// 
// app.get('/lostfound', function(req, res) {
//     res.sendFile(__dirname + '/client/lostfound.html');
// })

module.exports = app;
if (!module.parent) {
  http.Server(app).listen(PORT, function(){
    console.log('Server listening on port '+PORT+', congratulations.');
    console.log('http://localhost:'+PORT);
  });
}
