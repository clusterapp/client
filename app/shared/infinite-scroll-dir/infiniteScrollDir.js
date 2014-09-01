angular.module('app')
.directive('whenScrolled', function() {
  return function(scope, elem, attr) {
    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        scope.$apply(attr.whenScrolled);
      }
    });
  };
});
