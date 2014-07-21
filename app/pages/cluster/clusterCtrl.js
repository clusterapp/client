angular.module('app')
.controller('ClusterCtrl', function ($scope, $routeParams, AuthService, ClusterApiService) {

  AuthService.save($routeParams);

  $scope.loggedIn = AuthService.loggedIn();
  $scope.canEdit = false;

  ClusterApiService.getCluster($routeParams.username + '/' + $routeParams.clusterName)
  .then(function(cluster) {
    $scope.cluster = cluster;
    if(AuthService.get('userId') == cluster.owner.id ||
       cluster.admins && cluster.admins.map(function(a) { return a.id }).indexOf(AuthService.get('userId')) > -1
      ) {
      $scope.canEdit = true;
    }


    // now get the listings
    ClusterApiService.getListings(cluster.id)
    .then(function(listings) {
      $scope.after = listings.after;
      $scope.listings = listings.sorted
    });
  });

  $scope.infiniteScroll = function() {
    if(!$scope.cluster || !$scope.listings || !$scope.after) return;
    if(Object.keys($scope.after).length === 0) return;
    ClusterApiService.getListings($scope.cluster.id, $scope.after).then(function(listings) {
      listings.sorted.forEach(function(l) {
        $scope.listings.push(l);
      });
    });
  };

});
