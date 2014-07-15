angular.module('app')
.service('UserApiService', function ($cookies, $http) {

  var endpoint = "http://0.0.0.0:3000/users/";

  this.ENDPOINT = endpoint;
  this.getUser = function() {
    return $http.get(endpoint, {
      params: {
        userId: $cookies.userId,
        token: $cookies.userToken
      }
    }).then(function(result) {
      return result.data;
    });
  };
});
