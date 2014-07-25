angular.module('app')
.directive('LoginBtn', function ($location, $window, APIURLS) {
  function loginClicked(scope, elem, attrs) {
    elem.on('click', function () {
      $window.location.href = APIURLS() + '/auth/reddit?redirect=' + $location.absUrl();
    });
  }


  return {
    restrict: 'C',
    link: loginClicked
  };
});

angular.module('app')
.directive('closeBtn', function () {
  function closeClicked(scope, elem, attrs) {
    elem.on('click', function () {
      elem.parent().addClass('hide');
    });
  }
  
  
  return {
    restrict: 'C',
    link: closeClicked
  };
});
