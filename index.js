var PORT = process.env.PORT || 2000 //process.env.port is the port for heroku
var express = require('express')
var fs = require('fs')
var path = require('path')


var http = require('http')

const app = module.exports = express();
app.use(express.json());

/*Database*/
var url="postgres://wqjlggtbzvstyk:47e274afa81ead0a5dc59fbcf06e25b59d5161a24d2c69b84f5dcff933e36689@ec2-3-214-4-151.compute-1.amazonaws.com:5432/dc6b6uvlr0l7pn"
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: url,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.post('/testing', async (req, res) => {
    console.log('we here')
    console.log(req.body['title'])
    try {
        var title = req.body['title']
        var email = req.body['email']
        var details = req.body['details']
        const client = await pool.connect();
        const result = await client.query('INSERT INTO lost_and_found (title, email, details, phone_num) VALUES ($1, $2, $3, $4)', [title, email, details, req.body['number']]);
    //   const result = await client.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null};
        res.json(results);
        client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/laf', async (req, res) => {
    console.log('we here')
    console.log(req.body['title'])
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM lost_and_found');
      const results = { 'results': (result) ? result.rows : null};
      res.json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/events', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * from events WHERE event_date >= current_date ORDER BY event_date LIMIT 3');
      const results = { 'results': (result) ? result.rows : null};
      res.json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  
app.get('/officers-db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * from officers');
    const results = { 'results': (result) ? result.rows : null};
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})
/*Database*/

app.use(express.static(path.join(__dirname, 'client')))
app.use(require('./routes/index.js'));

module.exports = app;
if (!module.parent) {
  http.Server(app).listen(PORT, function(){
    console.log('Server listening on port '+PORT+', congratulations.');
    console.log('http://localhost:'+PORT);
  });
}
