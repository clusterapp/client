angular.module('app')
.controller('ClusterCtrl', function($scope,
                                    $routeParams,
                                    AuthService,
                                    ClusterApiService,
                                    UserApiService,
                                    ngProgressLite,
                                    toaster) {

  AuthService.save($routeParams);

  $scope.loggedIn = AuthService.loggedIn();
  $scope.canEdit = false;
  $scope.isEditing = false;
  $scope.edit = {}

  $scope.toggleEdit = function() {
    if($scope.canEdit) $scope.isEditing = !$scope.isEditing;
  };


  $scope.editSubreddits = function() {
    var subredditList = $scope.edit.subreddits.split(',').map(function(s) {
      return s.trim();
    }).filter(function(s) {
      return !!s;
    });

    if(subredditList.length === 0) {
      $scope.editSubredditsError = 'Need to add a list of subreddits';
      return;
    }

    ngProgressLite.start();
    ClusterApiService.update($scope.cluster.id, {
      subreddits: subredditList
    }).then(function(d) {
      ClusterApiService.bustCache($scope.cluster.id).then(function(d) {
        ngProgressLite.done();
        loadClusterAndListings();
      });
    });
  };

  $scope.addAdmin = function() {
    ngProgressLite.start();
    $scope.addAdminError = null;
    UserApiService.getUserByName($scope.edit.admin).then(function(user) {
      if(user.errors) {
        $scope.addAdminError = 'No user with that name exists';
        ngProgressLite.done();
        return;
      }
      $scope.cluster.admins.push(user.id);
      ClusterApiService.update($scope.cluster.id, {
        admins: $scope.cluster.admins
      }).then(function(d) {
        $scope.edit.admin = '';
        $scope.cluster = d;
        ngProgressLite.done();
        toaster.pop('success', 'Admin added', '');
      });
    });
  };

  var loadClusterAndListings = function() {
    ngProgressLite.start();
    ClusterApiService.getCluster($routeParams.username + '/' + $routeParams.clusterName)
    .then(function(cluster) {
      $scope.cluster = cluster;
      $scope.edit.subreddits = cluster.subreddits.join(', ');
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
          ngProgressLite.done();
        });
    });
  };

  loadClusterAndListings();

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

    ngProgressLite.start();
    ClusterApiService.getListings($scope.cluster.id, $scope.after).then(function(listings) {
      listings.sorted.forEach(function(l) {
        $scope.listings.sorted.push(l);
      });
      ngProgressLite.done();
    });
  };
});
