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


  this.getPrivateCluster = function (clusterRoute) {
    return get('name', {
      'clusterRoute': clusterRoute
    });
  };


  this.getListings = function (clusterid) {
    return get('listing', {
      clusterId: clusterid
    });
  };


});
