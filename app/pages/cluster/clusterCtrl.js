angular.module('app')
.controller('ClusterCtrl', function ($scope, $routeParams, AuthService, ClusterApiService, UserApiService) {

  AuthService.save($routeParams);

  $scope.loggedIn = AuthService.loggedIn();
  $scope.canEdit = false;
  $scope.isEditing = false;
  $scope.edit = {}

  $scope.toggleEdit = function() {
    if($scope.canEdit) $scope.isEditing = !$scope.isEditing;
  };

  $scope.addAdmin = function() {
    $scope.addAdminError = null;
    UserApiService.getUserByName($scope.edit.admin).then(function(user) {
      console.log(user.id);
      //TODO: proper error handling here
      if(user.errors) {
        $scope.addAdminError = 'No user with that name exists';
        return;
      }
      $scope.cluster.admins.push(user.id);
      ClusterApiService.update($scope.cluster.id, {
        admins: $scope.cluster.admins
      }).then(function(d) {
        $scope.edit.admin = '';
        $scope.cluster = d;
      });
    });
  };

  ClusterApiService.getCluster($routeParams.username + '/' + $routeParams.clusterName)
  .then(function(cluster) {
    $scope.cluster = cluster;
      console.log($scope.cluster.admins);
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
