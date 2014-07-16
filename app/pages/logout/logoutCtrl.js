angular.module('app')
.controller('LogoutCtrl', function ($scope, CookieStore, $location, $http, $window) {
  
  
  $http.get('/_logout')
  .then(function(result) {
    CookieStore.delete();
    $location.path('/');
    $window.location.reload();
  });
});
