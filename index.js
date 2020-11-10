var PORT = process.env.PORT || 2000 //process.env.port is the port for heroku
var express = require('express')
var exphbs  = require('express-handlebars');
var fs = require('fs')
var path = require('path')
var http = require('http')
var Sequelize = require('sequelize')

const app = module.exports = express();
app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const db = require('./models/index.js')
const Op = Sequelize.Op

var helpers = require('handlebars-helpers')();

/*Database*/
// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// app.get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM test_table');
//       const results = { 'results': (result) ? result.rows : null};
//       res.json(results);
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })

// app.post('/testing', async (req, res) => {
//     console.log('we here')
//     console.log(req.body['title'])
//     try {
//         var title = req.body['title']
//         var email = req.body['email']
//         var details = req.body['details']
//         const client = await pool.connect();
//         const result = await client.query('INSERT INTO lost_and_found (title, email, details, phone_num) VALUES ($1, $2, $3, $4)', [title, email, details, req.body['number']]);
//     //   const result = await client.query('SELECT * FROM test_table');
//         const results = { 'results': (result) ? result.rows : null};
//         res.json(results);
//         client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })

// app.get('/laf', async (req, res) => {
//     console.log('we here')
//     console.log(req.body['title'])
//     try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM lost_and_found');
//       const results = { 'results': (result) ? result.rows : null};
//       res.json(results);
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })

app.get('/', function (req, res) {
    db.events.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']},
      where: {event_date: {[Op.gt]: new Date()}},
      order: [['event_date', 'ASC']],
      limit: 3
    })
    .then(function(events) {
      res.render('index', {
        events: events
      });
    });
  });
// /*Database*/

app.use(express.static(path.join(__dirname, 'views')))
app.use(require('./routes/index.js'));

module.exports = app;
if (!module.parent) {
  http.Server(app).listen(PORT, function(){
    console.log('Server listening on port '+PORT+', congratulations.');
    console.log('http://localhost:'+PORT);
  });
}
