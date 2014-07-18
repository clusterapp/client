angular.module('app')
.factory('AuthService', function (localStorageService, $location) {

  var cs = {};

  cs.save = function ($routeParams) {
    if ($routeParams.token && $routeParams.user_id && $routeParams.user_name && $routeParams.last_active) {
      localStorageService.set('userToken', $routeParams.token);
      localStorageService.set('userId', $routeParams.user_id);
      localStorageService.set('redditName', $routeParams.user_name);
      localStorageService.set('lastActive', $routeParams.last_active);

      $location.url($location.path());
    }
  };


  cs.get = function (param) {
    return localStorageService.get(param);
  };


  cs.getUser = function() {
    return {
      id: localStorageService.get('userId'),
      redditName: localStorageService.get('redditName'),
      lastActive: localStorageService.get('lastActive'),
      token: localStorageService.get('userToken')
    };
  };


  cs.loggedIn = function() {
    return !!(
      localStorageService.get('userToken') && localStorageService.get('userId') && localStorageService.get('redditName') && localStorageService.get('lastActive')
    );
  };


  cs.delete = function () {
    localStorageService.clearAll();
  };

  return cs;
});
