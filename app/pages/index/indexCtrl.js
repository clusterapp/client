angular.module('app')
.controller('IndexCtrl', function ($scope, $location, AuthService, UserApiService, ClusterApiService) {
  $location.url($location.path());

  UserApiService.getUser().then(function(user) {
    $scope.user = user;
  });

  $scope.loggedIn = AuthService.loggedIn();

  ClusterApiService.getPublic().then(function(result) {
    $scope.publicClusters = result;
  });



});
