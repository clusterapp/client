angular.module('app')
.service('EditClusterService', function($q, UserApiService, ClusterApiService) {
  this.editAdmin = {
    userNamesForAutocomplete: function(owner) {
      var def = $q.defer();
      UserApiService.allUserNames().then(function(names) {
        var ownerLoc = names.indexOf(owner.redditName);
        names.splice(ownerLoc, 1);
        def.resolve(names);
      });
      return def.promise;
    },
    update: function(options) {
      var adminNames = options.adminNames;
      var cluster = options.cluster;
      var progressBar = options.progressBar;
      var notifier = options.notifier;
      progressBar.start();
      async.map(adminNames, function(admin, callback) {
        UserApiService.getUserByName(admin).then(function(user) {
          callback(null, user.id);
        });
      }, function(err, adminIds) {
        ClusterApiService.update(cluster.id, {
          admins: adminIds
        }).then(function(d) {
          progressBar.done();
          notifier.pop('success', 'Admins updated', '');
        });
      });
    }
  };
});
