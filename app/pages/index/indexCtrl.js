angular.module('app')
.controller('IndexCtrl', function ($scope, $routeParams, AuthService, UserApiService, ClusterApiService) {

  UserApiService.getUser().then(function(user) {
    $scope.user = user;
  });

  $scope.loggedIn = AuthService.loggedIn();

  ClusterApiService.getPublic().then(function(result) {
    $scope.publicClusters = result;
  });



});
