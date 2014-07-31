angular.module('app')
.factory('AuthService', function() {

  var cs = {};
  cs.loggedIn = function() {
    //TODO: this feels so horrible
    return $('body').data('loggedin');
  };

  cs.getUser = function() {
    return {
      id: $('body').data('user-id'),
      redditName: $('body').data('user-name')
    }
  };

  cs.get = function(param) {
    return cs.getUser()[param];
  };
  return cs;
});
