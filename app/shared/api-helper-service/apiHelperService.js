angular.module('app')
.factory('ApiHelperService', function($http, AuthService) {
  return {
    get: function(endpoint, url, params, noAuth) {
      if(noAuth !== true) {
        noAuth = false;
      }
      var defaultParams = {
        userId: AuthService.get('userId'),
        token:  AuthService.get('userToken')
      };
      for(var key in params) {
        defaultParams[key] = params[key];
      }
      return $http.get(endpoint + (url || ''), {
        params: noAuth ? {} :defaultParams
      }).then(function(result) {
        return result.data;
      });
    }
  };
});
