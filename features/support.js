var Browser = require('zombie');
var BASE_URL = 'http://127.0.0.1:3002';
var shell = require('shelljs');
var request = require('request');

before(function() {
  console.log('You need to have the API running with TEST_TOKEN set (to anything)');
  console.log('These tests will mess with the DB, it\'s recommended to run `npm run seed` after running the tests');
});
module.exports = {
  deleteClusters: function(cb) {
    request('http://127.0.0.1:3000/testing/delete_clusters', function() {
      cb();
    });
  },
  BASE_URL: BASE_URL,
  browser: new Browser(),
  authenticate: function(url, cb) {
    this.browser.visit('http://127.0.0.1:3000/auth/test_stub_oauth?name=jack&redirect=' + url, cb);
  },
  containsText: function(text) {
    return this.browser.html().indexOf(text) > -1;
  },
  visit: function(url, cb) {
    this.browser.visit(BASE_URL + url, cb);
  },
  html: function() {
    return this.browser.html();
  },
  fill: function() {
    return this.browser.fill.apply(this.browser, [].slice.call(arguments));
  }
};
