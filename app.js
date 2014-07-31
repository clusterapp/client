// server.js

// set up ========================
var express  = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var compress = require('compression');
var session = require('cookie-session')
var app = express();
var request = require('request');
var ejs = require('ejs')

app.set('view engine', 'ejs');



// configuration =================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/app/'));
app.use(logger('dev'));
app.use(session({ secret: 'foobar' }));
app.get('/_logout', function (req, res) {
  req.session.userId = undefined;
  req.session.token = undefined;
  req.session.userName = undefined;
  res.json(200, {});
});


app.get('*', function (req, res, next) {
  if(req.url.indexOf('/api') > -1) return next();
  var params = req.query;

  if (params.token && params.user_name && params.user_id && !req.session.userId) {
    req.session.userId = params.user_id;
    req.session.token = params.token;
    req.session.userName = params.user_name;
  }

  if(req.session.userId) {
    res.render('app', {
      loggedIn: true,
      userName: req.session.userName,
      userId: req.session.userId
    });
  } else {
    res.render('app', {
      userName: '',
      userId: '',
      loggedIn: false
    });
  }
});

// When user hits server ================
app.all('/api/*', function(req, res) {
  var urlForRequest = req.url.replace('/api', 'http://127.0.0.1:3000');
  if(req.session.userId) {
    urlForRequest += ( urlForRequest.indexOf('?') > -1 ? '&' : '?' );
    urlForRequest += 'userId=' + req.session.userId + '&token=' + req.session.token;
  }
  console.log('API REQUEST', urlForRequest);
  if(req.method == 'GET') {
    return request(urlForRequest).pipe(res)
  } else {
    console.log('POST', JSON.stringify(req.body));
    return request({
      method: 'POST',
      url: urlForRequest,
      json: req.body
    }).pipe(res);
  }
});

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 3002);
console.log("App listening on port 3002");


