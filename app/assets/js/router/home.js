angular.module('app')
.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      template: 'yummy',
      controller: 'indexCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

});
