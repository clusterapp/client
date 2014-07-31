angular.module('app')
.service('UserApiService', function (ApiHelperService, AuthService, $q, APIURLS) {

  var endpoint = "/api/users";

  this.ENDPOINT = endpoint;

  this.getUser = function() {
    // TODO: get rid of the fake async here - getUser() on the AuthService is sync
    var def = $q.defer();
    def.resolve(AuthService.getUser());
    return def.promise;
  };

  this.allUserNames = function() {
    return ApiHelperService.get(endpoint, '/all_names');
  };

  this.getUserByName = function(name) {
    return ApiHelperService.get(endpoint, '/name', {
      name: name
    });
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
