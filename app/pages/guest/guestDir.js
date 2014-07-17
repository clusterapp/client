angular.module('app')
.directive('LoginBtn', function ($location, $window) {
  
  function loginClicked(scope, elem, attrs) {
    elem.on('click', function () {
      console.log('I got here');
      $window.location.href = 'http://127.0.0.1:3000/auth/reddit?redirect=' + $location.absUrl();
    });
  }


  return {
    restrict: 'C',
    link: loginClicked
  };
});
