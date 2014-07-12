angular.module('app')
.controller('IndexCtrl', function ($scope, $routeParams, $cookies, $location, api) {


    // check if routeParams has values
  console.log($cookies, $routeParams);
    if ($routeParams.token && $routeParams.user_id && $routeParams.user_name) {
      $cookies.user = {
        token: $routeParams.token,
        user_id: $routeParams.user_id,
        user_name: $routeParams.user_name
      };

      $location.url($location.path());
    }

    console.log($cookies);
    if ($cookies.user) {
      $scope.isLoggedIn = true;

      console.log(api.getUser());


    }

   // delete $cookies['user'];
});
