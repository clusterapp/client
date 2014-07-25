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
  this.editSubreddits = {
    update: function(options) {
      var progressBar = options.progressBar;
      var cluster = options.cluster;

      progressBar.start();
      ClusterApiService.update(cluster.id, {
        subreddits: options.subreddits
      }).then(function(d) {
        ClusterApiService.bustCache(cluster.id).then(function(d) {
          progressBar.done();
          options.notifier.pop('success', 'Subreddits updated', '');
          (options.afterComplete || function() {})();
        });
      });
    }
  };
  this.editClusterName = {
    update: function(options) {
      var progressBar = options.progressBar;

      progressBar.start();
      return ClusterApiService.update(options.cluster.id, {
        name: options.name
      }).then(function(d) {
        progressBar.done();
        options.notifier.pop('success', 'Cluster name updated', '');
        (options.afterComplete || function() {})();
      });
    }
  }
});

