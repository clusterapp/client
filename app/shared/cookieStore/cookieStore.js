angular.module('app')
.factory('CookieStore', function ($cookies, $location) {

  var cs = {};

  cs.save = function ($routeParams) {

    if ($routeParams.token && $routeParams.user_id && $routeParams.user_name && $routeParams.last_active) {
      $cookies.userToken = $routeParams.token;
      $cookies.userId = $routeParams.user_id;
      $cookies.redditName = $routeParams.user_name;
      $cookies.lastActive = $routeParams.last_active;

      $location.url($location.path());
    }
  };


  cs.getUser = function() {
    return {
      id: $cookies.userId,
      redditName: $cookies.redditName,
      lastActive: $cookies.lastActive,
      token: $cookies.userToken
    };
  };
  cs.loggedIn = function() {
    return !!($cookies.userToken && $cookies.userId && $cookies.redditName && $cookies.lastActive);

  };
  cs.delete = function () {
    delete $cookies['userToken'];
    delete $cookies['userId'];
    delete $cookies['userName'];
    delete $cookies['lastActive'];
  };

  return cs;
});
