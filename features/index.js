var assert = require("assert");
var World = require('./support.js');

describe('authenticating', function() {
  it('shows a welcome message', function(done) {
    World.authenticate(World.BASE_URL, function() {
      assert.ok(World.containsText('Welcome jack'));
      done();
    });
  });
});
