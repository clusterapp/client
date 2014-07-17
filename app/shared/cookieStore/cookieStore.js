angular.module('app')
.factory('CookieStore', function ($cookieStore, $location) {

  var cs = {};

  cs.save = function ($routeParams) {

    if ($routeParams.token && $routeParams.user_id && $routeParams.user_name && $routeParams.last_active) {
      $cookieStore.put('userToken', $routeParams.token);
      $cookieStore.put('userId', $routeParams.user_id);
      $cookieStore.put('redditName', $routeParams.user_name);
      $cookieStore.put('lastActive', $routeParams.last_active);

      $location.url($location.path());
    }
  };


  cs.getUser = function() {
    return {
      id: $cookieStore.get('userId'),
      redditName: $cookieStore.get('redditName'),
      lastActive: $cookieStore.get('lastActive'),
      token: $cookieStore.get('userToken')
    };
  };
  cs.loggedIn = function() {
    return !!(
      $cookieStore.get('userToken') && $cookieStore.get('userId') && $cookieStore.get('redditName') && $cookieStore.get('lastActive')
    );
  };

  cs.delete = function () {
    $cookieStore.remove('userToken');
    $cookieStore.remove('userId');
    $cookieStore.remove('userName');
    $cookieStore.remove('lastActive');
  };

  return cs;
});
