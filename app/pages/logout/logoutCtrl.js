angular.module('app')
.controller('LogoutCtrl', function ($scope, AuthService, $location, $http, $window) {
  $http.get('/_logout')
  .then(function(result) {
    AuthService.delete();
    $location.path('/');
    $window.location.reload();
  });
});
