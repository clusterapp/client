angular.module('app')
.service('UserApiService', function (ApiHelperService) {

  var endpoint = "http://0.0.0.0:3000/users";

  this.ENDPOINT = endpoint;

  this.getUser = function() {
    return ApiHelperService.get(endpoint);
  };

  this.getUserOwnClusters = function() {
    return ApiHelperService.get(endpoint, '/clusters/own');
  };

  this.getUserAdminClusters = function() {
    return ApiHelperService.get(endpoint, '/clusters/admin');
  };

  this.getUserSubscribedClusters = function() {
    return ApiHelperService.get(endpoint, '/clusters/subscribed');
  };
});
