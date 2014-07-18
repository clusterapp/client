angular.module('app')
.controller('IndexCtrl', function ($scope, $routeParams, AuthService, UserApiService, ClusterApiService) {

  AuthService.save($routeParams);

  UserApiService.getUser().then(function(result) {
    if(result.errors && result.errors.length) {
      // something went wrong
    } else {
      $scope.user = result;
    }
  });

  $scope.loggedIn = AuthService.loggedIn();

  ClusterApiService.getPublic().then(function(result) {
    $scope.publicClusters = result;
  });



});
