var app = angular.module('app', [
  'ngRoute',
  'LocalStorageModule',
  'angularMoment',
  'infinite-scroll',
  'ngProgress',
  'ngAnimate',
  'toaster'
])

app.factory('APIURLS', function($location) {
  return function() {
    if($location.absUrl().indexOf('localhost') > -1 || $location.absUrl().indexOf('127.0.0.1') > -1) {
      return 'http://127.0.0.1:3000';
    } else {
      return 'PROD_URL_HERE';
    }
  };

});
