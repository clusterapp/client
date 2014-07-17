// server.js

// set up ========================
var express  = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var compress = require('compression');
var session = require('express-session');
var app = express();


// configuration =================
app.use(express.static(__dirname + '/app/'));
app.use(logger('dev'));
app.use(compress());
app.use(session({secret: 'keyboard cat', saveUninitialized: true, resave:true}));
app.use(bodyParser.urlencoded({ extended: true }));





app.get('/_logout', function (req, res) {
  
  req.session.destroy();

  console.log(req.session);

  res.json(200, {});
});


app.get('/login', function (req, res) {
  var sess = req.session

  if (sess.user) {
    res.sendfile('./app/app.html');
  } else {
    res.sendfile('./app/login.html');
  }
});




// When user hits server ================
app.get('*', function (req, res) {
  // must check if route has parameters of token and user etc... (if so then this is logging a user in)
  console.log(req.session);
  var sess = req.session;
  var params = req.query;

  if (params.token && params.user_name && params.user_id && !sess.user) {
    // then they have logged in
    sess.user = {
      token: params.token,
      user_id: params.user_id,
      user_name: params.user_name
    };
  }

  console.log('This is a session:', sess);

  if (sess.user && sess.user.token && sess.user.user_id) {
    res.sendfile('./app/app.html');
  } else {
    res.sendfile('./app/guest.html');
  }
});




// listen (start app with node server.js) ======================================
app.listen(3002);
console.log("App listening on port 3002");


