var st = require('st'),
    http = require('http'),
    dir = process.cwd() + '/app/';

var mount = st({
  path: dir,
  url: '/',
  index: 'index.html'
});

http.createServer(function(req, res) {
  var stHandled = mount(req, res);
  if (stHandled) {
    return;
  } else {
    res.end('Not a static file');
  }
}).listen(process.env.PORT || 3002);
