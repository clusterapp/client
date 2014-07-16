angular.module('app')
.config(function ($routeProvider) {

  $routeProvider
  .when('/:username/:clusterName', {
    templateUrl: '/pages/cluster/clusterTemplate.html',
    controller: 'ClusterCtrl',
    reloadOnSearch: false
  });
});
