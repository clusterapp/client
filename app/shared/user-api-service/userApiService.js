angular.module('app')
.service('UserApiService', function (ApiHelperService, AuthService, $q, APIURLS) {

  var endpoint = APIURLS() + "/users/";

  this.ENDPOINT = endpoint;

  this.getUser = function() {
    if(AuthService.loggedIn()) {
      var def = $q.defer();
      def.resolve(AuthService.getUser());
      return def.promise;
    } else {
      return ApiHelperService.get(endpoint);
    }
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
