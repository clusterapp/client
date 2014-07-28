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
        if(d.errors && d.errors.length) {
          progressBar.done();
          options.notifier.pop('error', 'You already have a cluster with that name', '');
        } else {
          progressBar.done();
          options.notifier.pop('success', 'Cluster name updated', '');
          (options.afterComplete || function() {})();
        }
      });
    }
  };
  this.editSubscribers = {
    addSubscriber: function(options) {
      var newSubscribers = options.cluster.subscribers.slice(0);
      newSubscribers.push(options.newSubscriberId);
      return this.update(_.extend(options, { subscribers: newSubscribers }));
    },
    removeSubscriber: function(options) {
      var subscriberIndex = options.cluster.subscribers.indexOf(options.subscriberToRemove);
      var newSubscribers = options.cluster.subscribers.slice(0);
      newSubscribers.splice(subscriberIndex, 1);
      return this.update(_.extend(options, { subscribers: newSubscribers }));
    },

    update: function(options) {
      var progressBar = options.progressBar;

      progressBar.start();
      return ClusterApiService.update(options.cluster.id, {
        subscribers: options.subscribers
      }).then(function(d) {
        if(d.errors && d.errors.length) {
          console.log('update errors', d);
          progressBar.done();
          options.notifier.pop('error', 'An error occured when subscribing', '');
        } else {
          progressBar.done();
          options.notifier.pop('success', 'Subscription to this cluster updated', '');
          (options.afterComplete || function() {})();
        }
      });

    }
  };
});

