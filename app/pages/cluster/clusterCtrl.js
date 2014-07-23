angular.module('app')
.controller('ClusterCtrl', function($scope,
                                    $routeParams,
                                    AuthService,
                                    ClusterApiService,
                                    UserApiService,
                                    ngProgress,
                                    toaster) {

  AuthService.save($routeParams);

  $scope.loggedIn = AuthService.loggedIn();
  $scope.canEdit = false;
  $scope.isEditing = false;
  $scope.edit = {}

  $scope.toggleEdit = function() {
    if($scope.canEdit) $scope.isEditing = !$scope.isEditing;
  };


  $scope.addAdmin = function() {
    ngProgress.start();
    $scope.addAdminError = null;
    UserApiService.getUserByName($scope.edit.admin).then(function(user) {
      if(user.errors) {
        $scope.addAdminError = 'No user with that name exists';
        ngProgress.complete();
        return;
      }
      $scope.cluster.admins.push(user.id);
      ClusterApiService.update($scope.cluster.id, {
        admins: $scope.cluster.admins
      }).then(function(d) {
        $scope.edit.admin = '';
        $scope.cluster = d;
        ngProgress.complete();
        toaster.pop('success', 'Admin added', '');
      });
    });
  };

  ngProgress.start();
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
        $scope.listings = listings;
        console.log(listings.sorted[0]);
        ngProgress.complete();
      });
  });

  var noPermErrorSent = false;
  $scope.infiniteScroll = function() {
    if(!$scope.cluster || !$scope.listings || !$scope.after) return;

    if(Object.keys($scope.after).length === 0) {
      if(!noPermErrorSent) {
        toaster.pop('error', 'No permission', 'To see more than one page of content, you need to sign in.');
        noPermErrorSent = true;
      }
      return;
    }

    console.log('got here');
    ngProgress.start();
    ClusterApiService.getListings($scope.cluster.id, $scope.after).then(function(listings) {
      listings.sorted.forEach(function(l) {
        $scope.listings.sorted.push(l);
      });
      ngProgress.complete();
    });
  };
});
