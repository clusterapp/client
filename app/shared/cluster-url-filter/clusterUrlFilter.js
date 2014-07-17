angular.module('app')
.filter('clusterUrl', function() {
  return function(input) {
    return '/' + input.owner.redditName + '/' + input.name;
  }
});
