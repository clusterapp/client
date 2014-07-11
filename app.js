// server.js

// set up ========================
var express  = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var compress = require('compression');

var app = express();                 // create our app w/ express

// configuration =================
app.use(express.static(__dirname + '/app/'));     // set the static files location /public/img will be /img for users
app.use(logger('dev'));             // log every request to the console
app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('*', function (req, res) {
  res.sendfile('./app/index.html');
});


// listen (start app with node server.js) ======================================
app.listen(3002);
console.log("App listening on port 3002");


