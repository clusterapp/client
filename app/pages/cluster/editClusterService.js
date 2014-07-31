angular.module('app')
.service('EditClusterService', function($q, UserApiService, ClusterApiService) {
  var _updateCluster = function(options) {
    options.progressBar.start();

    var updateCallback = function(d) {
      options.messages = options.messages || {};
      if(d.errors && d.errors.length) {
        options.progressBar.done();
        options.notifier.pop('error', options.messages.errorTitle, options.messages.errorMessage || '');
      } else {
        options.progressBar.done();
        options.notifier.pop('success', options.messages.successTitle, options.messages.successMessage || '');
        (options.afterComplete || function() {})();
      }
    };
    var updatedPromise = ClusterApiService.update(options.cluster.id, options.changeData);

    if(options.cacheBust) {
      updatedPromise.then(function(d) {
        ClusterApiService.bustCache(options.cluster.id).then(updateCallback);
      });
    } else {
      updatedPromise.then(updateCallback);
    }
    return updatedPromise;
  };

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
      options.progressBar.start();
      async.map(options.adminNames, function(admin, callback) {
        UserApiService.getUserByName(admin).then(function(user) {
          callback(null, user.id);
        });
      }, function(err, adminIds) {
        ClusterApiService.update(options.cluster.id, {
          admins: adminIds
        }).then(function(d) {
          options.progressBar.done();
          options.notifier.pop('success', 'Admins updated', '');
        });
      });
    }
  };
  this.editSubreddits = {
    update: function(options) {
      return _updateCluster(_.extend(options, {
        cacheBust: true,
        messages: {
          successTitle: 'Subreddits updated'
        },
        changeData: { subreddits: options.subreddits }
      }));
    }
  };
  this.editClusterName = {
    update: function(options) {
      return _updateCluster(_.extend(options, {
        changeData: { name: options.name },
        messages: {
          successTitle: 'Cluster name updated',
          errorTitle: 'You already have a cluster with that name'
        }
      }));
    }
  };
  this.editSubscribers = {
    addSubscriber: function(options) {
      var newSubscribers = options.cluster.subscribers.slice(0);
      newSubscribers.push(options.newSubscriberId);
      return _updateCluster(_.extend(options, {
        changeData: { subscribers: newSubscribers },
        cacheBust: false,
        messages: {
          successTitle: 'You have subscribed to this cluster'
        }
      }));
    },
    removeSubscriber: function(options) {
      var subscriberIndex = options.cluster.subscribers.indexOf(options.subscriberToRemove);
      var newSubscribers = options.cluster.subscribers.slice(0);
       newSubscribers.splice(subscriberIndex, 1);
      return _updateCluster(_.extend(options, {
        changeData: { subscribers: newSubscribers },
        messages: {
          successTitle: 'You have unsubscribed from this cluster'
        },
        cacheBust: false
      }));
    },
  };
});

