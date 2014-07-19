angular.module('app')
.service('ClusterApiService', function (AuthService, $http, ApiHelperService) {

  var endpoint = "http://0.0.0.0:3000/clusters/";

  this.ENDPOINT = endpoint;

  this.create = function(data) {
    data.owner = AuthService.get('userId');
    return $http.post(endpoint + 'create?userId=' + AuthService.get('userId') + '&token=' + AuthService.get('userToken'), data)
    .then(function(result) {
      return result.data;
    });
  };

  this.getCluster = function (clusterRoute) {
    return ApiHelperService.get(endpoint, 'name', {
      'clusterRoute': clusterRoute
    });
  };

  this.getListings = function (clusterid, after) {
    var params = {
      clusterId: clusterid,
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
