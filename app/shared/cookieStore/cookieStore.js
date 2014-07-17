angular.module('app')
.factory('CookieStore', function ($cookieStore, $location) {

  var cs = {};

  cs.save = function ($routeParams) {

    if ($routeParams.token && $routeParams.user_id && $routeParams.user_name) {
      $cookieStore.put('userToken', $routeParams.token);
      $cookieStore.put('userId', $routeParams.user_id);
      $cookieStore.put('userName', $routeParams.user_name);

      $location.url($location.path());
    }
  };


  cs.loggedIn = function() {
    return !!(
      $cookieStore.get('userToken') && $cookieStore.get('userId') && $cookieStore.get('userName')
    );

  };
  cs.delete = function () {
    $cookieStore.remove('userToken');
    $cookieStore.remove('userId');
    $cookieStore.remove('userName');
  };

  return cs;
});
