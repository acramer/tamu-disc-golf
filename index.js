var PORT = process.env.PORT || 3000 //process.env.port is the port for heroku
var express = require('express')
var app = express()

var http = require('http')
var server = http.Server(app)

app.use(express.static('client'))

server.listen(PORT, function() {
    console.log('Server running, congratulations.')
})
