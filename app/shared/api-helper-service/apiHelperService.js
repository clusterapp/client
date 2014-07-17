angular.module('app')
.factory('ApiHelperService', function($http, $cookies) {
  return {
    get: function(endpoint, url, params, noAuth) {
      if(noAuth !== true) {
        noAuth = false;
      }
      var defaultParams = {
        userId: $cookies.userId,
        token: $cookies.userToken
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
