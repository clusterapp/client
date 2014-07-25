angular.module('app')
.controller('ClusterCtrl', function($scope,
                                    $routeParams,
                                    AuthService,
                                    ClusterApiService,
                                    UserApiService,
                                    ngProgressLite,
                                    toaster,
                                    $location,
                                    EditClusterService) {

  AuthService.save($routeParams);

  $scope.loggedIn = AuthService.loggedIn();
  $scope.canEdit = false;
  $scope.isEditing = false;
  $scope.edit = {}

  $scope.toggleEdit = function() {
    if($scope.canEdit) $scope.isEditing = !$scope.isEditing;
  };

  $scope.editSubreddits = function() {
    EditClusterService.editSubreddits.update({
      subreddits: $scope.tagSubreddits.map(function(s) {
        return s.text;
      }),
      notifier: toaster,
      progressBar: ngProgressLite,
      afterComplete: loadClusterAndListings,
      cluster: $scope.cluster
    });
  };

  $scope.editName = function() {
    EditClusterService.editClusterName.update({
      name: $scope.editClusterName,
      cluster: $scope.cluster,
      notifier: toaster,
      progressBar: ngProgressLite,
      afterComplete: function() {
        $location.path('/' + $scope.cluster.owner.redditName + '/' + $scope.editClusterName);
      }
    });
  };

  $scope.allUserNamesAutocomplete = function() {
    return EditClusterService.editAdmin.userNamesForAutocomplete($scope.cluster.owner);
  };

  $scope.editAdmin = function() {
    EditClusterService.editAdmin.update({
      adminNames: $scope.tagAdmins.map(function(a) { return a.text; }),
      cluster: $scope.cluster,
      progressBar: ngProgressLite,
      notifier: toaster
    });
  };

  var loadClusterAndListings = function() {
    ngProgressLite.start();
    ClusterApiService.getCluster($routeParams.username + '/' + $routeParams.clusterName)
    .then(function(cluster) {
      $scope.cluster = cluster;
      $scope.edit.subreddits = cluster.subreddits.join(', ');
      $scope.tagSubreddits = cluster.subreddits.map(function(s) {
        return { text: s };
      });

      $scope.tagAdmins = cluster.admins.map(function(a) {
        return { text: a.redditName }
      });

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
