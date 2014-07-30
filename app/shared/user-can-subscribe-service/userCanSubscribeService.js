angular.module('app')
.service('UserCanSubscribeService', function() {
  var containsId = function(ary, id) {
    return ary.some(function(elem) {
      return elem.id == id;
    });
  };
  this.canSubscribe = function(user, cluster) {
    if(cluster.public === false) return false;
    if(containsId(cluster.admins, user.id)) return false;
    if(cluster.admins.indexOf(user.id) > -1) return false;
    if(cluster.owner.id == user.id) return false;
    if(containsId(cluster.subscribers, user.id)) return false;
    return true;
  };
});
