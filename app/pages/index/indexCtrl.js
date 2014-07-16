angular.module('app')
.controller('IndexCtrl', function ($scope, $routeParams, CookieStore, UserApiService) {

  CookieStore.save($routeParams);

  UserApiService.getUser().then(function(result) {
    if(result.errors && result.errors.length) {
      // something went wrong
    } else {
      $scope.user = result;
    }
  });


});
