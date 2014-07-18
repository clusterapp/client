angular.module('app')
.service('ClusterApiService', function (CookieStore, $http, ApiHelperService) {

  var endpoint = "http://0.0.0.0:3000/clusters/";

  this.ENDPOINT = endpoint;

  this.create = function(data) {
    data.owner = CookieStore.get('userId');
    return $http.post(endpoint + 'create?userId=' + CookieStore.get('userId') + '&token=' + CookieStore.get('userToken'), data)
    .then(function(result) {
      return result.data;
    });
  };

  this.getCluster = function (clusterRoute) {
    return ApiHelperService.get(endpoint, 'name', {
      'clusterRoute': clusterRoute
    });
  };

  this.getListings = function (clusterid) {
    return ApiHelperService.get(endpoint, 'listing', {
      clusterId: clusterid
    });
  };

  this.getPublic = function() {
    return ApiHelperService.get(endpoint, 'public', {}, true);
  };
});
