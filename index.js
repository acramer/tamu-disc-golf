var PORT = process.env.PORT || 2000 //process.env.port is the port for heroku
var express = require('express')
var exphbs  = require('express-handlebars');
var fs = require('fs')
var path = require('path')
var http = require('http')

const app = module.exports = express();
app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/*Database*/
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


app.use(express.static(path.join(__dirname, 'views')))
app.use(require('./routes/index.js'));

module.exports = app;
if (!module.parent) {
  http.Server(app).listen(PORT, function(){
    console.log('Server listening on port '+PORT+', congratulations.');
    console.log('http://localhost:'+PORT);
  });
}
