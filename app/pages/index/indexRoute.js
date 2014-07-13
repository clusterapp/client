angular.module('app')
.config(function ($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
      templateUrl: '/pages/index/indexTemplate.html',
      controller: 'IndexCtrl',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});
