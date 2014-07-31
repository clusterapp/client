angular.module('app')
.directive('whenScrolled', function() {
  return function(scope, elem, attr) {
    elem.parent().bind('scroll', function() {
      if(Math.abs($(this).scrollTop() - elem[0].scrollHeight) < 1500) {
        scope.$apply(attr.whenScrolled);
      }
    });
  };
});
