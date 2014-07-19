angular.module('app')
.controller('CreateCtrl', function ($scope, $routeParams, AuthService, ClusterApiService) {

  AuthService.save($routeParams);

  $scope.chosen = [];

  ClusterApiService.getPopularSubreddits().then(function(data) {
    $scope.subreddits = data.map(function(subreddit) {
      return subreddit.display_name;
    });
  });

  $scope.updateChosen = function(newVal) {
    // remove the selected one from the autocomplete
    var arrayIdx = $scope.subreddits.indexOf(newVal);
    $scope.subreddits.splice(arrayIdx, 1);

    $scope.chosen.push(newVal);
    $scope.cSR = ""
  }

});
