angular.module('app')
.service('ClusterApiService', function (AuthService, $http, ApiHelperService, APIURLS) {

  var endpoint = "/api/clusters/";

  this.ENDPOINT = endpoint;

  this.create = function(data) {
    data.owner = AuthService.get('id');
    return $http.post(endpoint + 'create', data)
    .then(function(result) {
      return result.data;
    });
  };

  this.update = function(clusterId, data) {
    return $http.post(endpoint + 'update?clusterId=' + clusterId, data)
    .then(function(result) {
      return result.data;
    });
  };

  this.getCluster = function (clusterRoute) {
    return ApiHelperService.get(endpoint, 'name', {
      'clusterRoute': clusterRoute
    });
  };

  this.bustCache = function(clusterId) {
    return ApiHelperService.get(endpoint, 'cache_bust', { clusterId: clusterId });
  };

  this.getListings = function (clusterId, after) {
    var params = {
      clusterId: clusterId,
    };

    for(var key in after) {
      params['after_' + key] = after[key];
    }

    return ApiHelperService.get(endpoint, 'listing', params);
  };

  this.getPublic = function() {
    return ApiHelperService.get(endpoint, 'public', {}, true);
  };
});
