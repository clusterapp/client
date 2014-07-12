angular.module('app')
.service('api', function ($cookies, $http) {

  var endpoint = "http://0.0.0.0:3000";

  this.getUser = function () {
    return $http.get(endpoint + '/users', {
      params: {
        'token': $cookies.userToken,
        'userId': $cookies.userId
      }
    }).then(function(result) {
      return result.data;
    });
  };
});
