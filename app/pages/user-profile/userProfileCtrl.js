angular.module('app')
.controller('UserProfileCtrl', function ($scope, $routeParams, CookieStore, UserApiService) {

  UserApiService.getUser().then(function(result) {
    if(result.errors && result.errors.length) {
      // something went wrong
    } else {
      $scope.user = result;
    }
  });

  $scope.clusters = {};

  UserApiService.getUserOwnClusters().then(function(clusters) {
    console.log(clusters);
    $scope.clusters.own = clusters;
  });

  UserApiService.getUserAdminClusters().then(function(clusters) {
    $scope.clusters.admin = clusters;
  });

  UserApiService.getUserSubscribedClusters().then(function(clusters) {
    $scope.clusters.subscribed = clusters;
  });

});
