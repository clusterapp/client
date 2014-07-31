angular.module('app')
.factory('ApiHelperService', function($http, AuthService) {
  return {
    get: function(endpoint, url, params, noAuth) {
      return $http.get(endpoint + (url || ''), {
        params: params || {}
      }).then(function(result) {
        return result.data;
      });
    }
  };
});
