angular.module('app')
.service('ClusterApiService', function ($cookies, $http, ApiHelperService) {

  var endpoint = "http://0.0.0.0:3000/clusters/";

  this.ENDPOINT = endpoint;

  this.create = function(data) {
    data.owner = $cookies.userId;
    return $http.post(endpoint + 'create?userId=' + $cookies.userId + '&token=' + $cookies.userToken, data)
    .then(function(result) {
      return result.data;
    });
  };

  this.getPrivateCluster = function (clusterRoute) {
    return ApiHelperService.get(endpoint, 'name', {
      'clusterRoute': clusterRoute
    });
  };

  this.getListings = function (clusterid) {
    return ApiHelperService.get(endpoint, 'listing', {
      clusterId: clusterid
    });
  };
});
