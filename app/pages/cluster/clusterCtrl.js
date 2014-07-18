angular.module('app')
.controller('ClusterCtrl', function ($scope, $routeParams, AuthService, ClusterApiService) {

  AuthService.save($routeParams);

  ClusterApiService.getCluster($routeParams.username + '/' + $routeParams.clusterName)
  .then(function(cluster) {
    $scope.cluster = cluster;


    // now get the listings
    ClusterApiService.getListings(cluster.id).then(function(listings) {
      $scope.listings = listings;
    });
  });

});
