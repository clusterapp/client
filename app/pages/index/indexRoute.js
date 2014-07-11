angular.module('app')
.config(function ($routeProvider) {

    $routeProvider
    .when('/', {
      templateUrl: '/pages/index/indexTemplate.html',
      controller: 'IndexCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

});
