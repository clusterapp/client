angular.module('app')
.controller('CreateCtrl', function ($scope, ClusterApiService, $location) {

  $scope.createCluster = function () {
    if ($scope.cName && $scope.cSR) {
      ClusterApiService.create({
        'name': $scope.cName.replace(/ /g, ''),
        'subreddits': $scope.cSR.replace(/ /g, '').split(','),
        'public': ($scope.cPublic || false)
      }).then(function (result) {
        if (result.errors && result.errors.length) {
          // something went wrong
        } else {
          $location.path('/' + result.owner.redditName + '/' + result.name);
        }
      });
    }
  };


});
