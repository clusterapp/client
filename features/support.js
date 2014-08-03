var Browser = require('zombie');
var BASE_URL = 'http://127.0.0.1:3002';

module.exports = {
  BASE_URL: BASE_URL,
  browser: new Browser(),
  authenticate: function(url, cb) {
    this.browser.visit('http://127.0.0.1:3000/auth/test_stub_oauth?name=jack&redirect=' + url, cb);
  },
  containsText: function(text) {
    return this.browser.html().indexOf(text) > -1;
  }
};
