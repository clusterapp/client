angular.module('app')
.controller('ClusterCtrl', function ($scope, $routeParams, CookieStore, ClusterApiService) {

  CookieStore.save($routeParams);

  ClusterApiService.getPrivateCluster($routeParams.username + '/' + $routeParams.clusterName)
  .then(function(cluster) {
    console.log(cluster);
    $scope.cluster = cluster;


    // now get the listings
    ClusterApiService.getListings(cluster.id)
    .then(function(listings) {
      console.log(listings);
      $scope.listings = listings;
    });
  });

});
