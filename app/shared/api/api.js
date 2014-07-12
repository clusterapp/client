angular.module('app')
.service('api', function ($cookies, $http) {

  var endpoint = "http://0.0.0.0:3000";

  this.getUser = function () {
    $http.get(endpoint + '/users/',
      {
        params: {
          'token': $cookies.user.token,
          'userId': $cookies.user.user_id
        }
      }
    )
    .success(function (data) {
      return data;
    })
  };
});
