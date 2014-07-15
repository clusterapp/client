angular.module('app')
.controller('CreateCtrl', function ($scope, $routeParams, CookieStore) {

  CookieStore.save($routeParams);

});
