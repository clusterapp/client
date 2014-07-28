angular.module('app')
.service('UserCanSubscribeService', function() {
  this.canSubscribe = function(user, cluster) {
    if(cluster.public === false) return false;
    if(cluster.admins.indexOf(user.id) > -1) return false;
    if(cluster.owner == user.id) return false;
    if(cluster.subscribers.indexOf(user.id) > -1) return false;
    return true;
  };
});
