angular.module('app')
.service('ClusterApiService', function ($cookies, $http) {

  var endpoint = "http://0.0.0.0:3000/clusters/";

  this.ENDPOINT = endpoint;
  this.create = function(data) {
    data.owner = $cookies.userId;
    return $http.post(endpoint + 'create?userId=' + $cookies.userId + '&token=' + $cookies.userToken, data)
    .then(function(result) {
      return result.data;
    });
  };
});
