var assert = require("assert");
var World = require('./support.js');

describe('creating a cluster', function() {
  beforeEach(function(done) {
    World.authenticate(World.BASE_URL, function() {
      done();
    });
  });

  it('shows the form fields for creating a cluster', function(done) {
    World.visit('/jack/create', function() {
      assert.equal(World.browser.queryAll('.c-Name').length, 1);
      assert.equal(World.browser.queryAll('.c-SR').length, 1);
      assert.equal(World.browser.queryAll('.c-Public').length, 1);
      done();
    });
  });
});
