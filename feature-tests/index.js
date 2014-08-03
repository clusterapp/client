var Browser = require("zombie");
var assert = require("assert");

// Load the page from localhost
browser = new Browser();

var BASE_URL = 'http://127.0.0.1:3002';
// browser.visit(BASE_URL, function() {
//   assert.ok(browser.success);
//   assert.equal(browser.text('title'), 'ClusterApp');
// });

browser.visit('http://127.0.0.1:3000/auth/test_stub_oauth?name=jack&redirect=' + BASE_URL, function() {
  assert.ok(browser.success);
  assert.equal(browser.text('title'), 'ClusterApp');
  console.log(browser.html());
  assert.ok(browser.html().indexOf('Welcome to Cluster, jack') > -1);
});
