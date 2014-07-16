angular.module('app')
.config(function ($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: '/pages/index/indexTemplate.html',
    controller: 'IndexCtrl',
    reloadOnSearch: false
  })
  .when('/logout', {
    controller: 'LogoutCtrl',
    template: ''
  })
  .when('/:username/create', {
    templateUrl: '/pages/create/createTemplate.html',
    controller: 'CreateCtrl',
    reloadOnSearch: false
  })
  .when('/:username/:clusterName', {
    templateUrl: '/pages/cluster/clusterTemplate.html',
    controller: 'ClusterCtrl',
    reloadOnSearch: false
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

});
