angular.module('app')
.service('EditClusterService', function($q, UserApiService) {
  this.editAdmin = {
    userNamesForAutocomplete: function(owner) {
      var def = $q.defer();
      UserApiService.allUserNames().then(function(names) {
        var ownerLoc = names.indexOf(owner.redditName);
        names.splice(ownerLoc, 1);
        def.resolve(names);
      });
      return def.promise;
    }
  };
});
