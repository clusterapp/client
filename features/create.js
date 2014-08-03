var assert = require("assert");
var World = require('./support.js');

describe('creating a cluster', function() {
  before(function(done) {
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

  it('creates the new cluster', function(done) {
    World.deleteClusters(function() {
      World.visit('/jack/create', function() {
        World.fill('.c-Name', 'coding').fill('.c-SR', 'mufc').pressButton('Create', function() {
          World.visit('/jack/coding', function() {
            assert.ok(World.containsText('mufc'));
            assert.ok(World.containsText('coding'));
            done();
          });
        });
      });
    });
  });
});
