angular.module('app')
.service('UserApiService', function ($cookies, $http) {

  var endpoint = "http://0.0.0.0:3000/users";

  this.ENDPOINT = endpoint;

  var get = function(url, params) {
    var defaultParams = {
      userId: $cookies.userId,
      token: $cookies.userToken
    };
    for(var key in params) {
      defaultParams[key] = params[key];
    }
    return $http.get(endpoint + (url || ''), {
      params: defaultParams
    }).then(function(result) {
      return result.data;
    });
  };

  this.getUser = function() {
    return get();
  };

  this.getUserOwnClusters = function() {
    return get('/clusters/own');
  };

  this.getUserAdminClusters = function() {
    return get('/clusters/admin');
  };

  this.getUserSubscribedClusters = function() {
    return get('/clusters/subscribed');
  };
});
