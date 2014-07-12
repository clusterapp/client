angular.module('app')
.service('UserApiService', function ($cookies, $http) {

  var endpoint = "http://0.0.0.0:3000";

  this.ENDPOINT = endpoint;
  this.getUser = function(params) {
    return $http.get(endpoint + '/users', {
      params: params
    }).then(function(result) {
      return result.data;
    });
  };
});
