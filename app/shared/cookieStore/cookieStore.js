angular.module('app')
.factory('CookieStore', function ($cookies, $location) {

  var cs = {};

  cs.save = function ($routeParams) {

    if ($routeParams.token && $routeParams.user_id && $routeParams.user_name) {
      $cookies.userToken = $routeParams.token;
      $cookies.userId = $routeParams.user_id;
      $cookies.userName = $routeParams.user_name;

      $location.url($location.path());
    }
  };


  cs.loggedIn = function() {
    return !!($cookies.userToken && $cookies.userId && $cookies.userName);

  };
  cs.delete = function () {
    delete $cookies['userToken'];
    delete $cookies['userId'];
    delete $cookies['userName'];
  };

  return cs;
});
