angular.module('app')
.controller('IndexCtrl', function ($scope, $routeParams, AuthService, UserApiService, ClusterApiService) {

  UserApiService.getUser().then(function(result) {
    if(result.errors && result.errors.length) {
      // something went wrong
    } else {
      $scope.user = result;
    }
  });

  $scope.loggedIn = $('body').data('loggedin');

  ClusterApiService.getPublic().then(function(result) {
    $scope.publicClusters = result;
  });



});
