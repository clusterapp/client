angular.module('app')
.controller('IndexCtrl', function ($scope, $routeParams, $cookies, $location, UserApiService) {
  // check if routeParams has values
  if ($routeParams.token && $routeParams.user_id && $routeParams.user_name) {
    $cookies.userToken = $routeParams.token;
    $cookies.userId = $routeParams.user_id;
    $cookies.userName = $routeParams.user_name;

    $location.url($location.path());
  }

  if ($cookies.userToken) {
    $scope.isLoggedIn = true;
    UserApiService.getUser({
      userId: $cookies.userId,
      userToken: $cookies.userToken
    }).then(function(result) {
      if(result.errors && result.errors.length) {
        // something went wrong
      }
      // result is the user
    });
  }
  // delete $cookies['user'];
});
