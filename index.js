var PORT = process.env.PORT || 2000 //process.env.port is the port for heroku
var express = require('express')

var http = require('http')

const app = module.exports = express();

/*Database*/
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
/*Database*/

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
