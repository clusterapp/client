angular.module('app')
.directive('ClusterCreate', function (ClusterApiService, $location) {

  var submitForm = function (scope, elem, attrs) {
    elem.on('click', function () {
      //console.log(scope.cName, scope.cSR, scope.cPublic);

      if (validParams(scope.cName, scope.cSR, scope.cPublic)) {
        ClusterApiService.create({
          'name': scope.cName.replace(/ /g, ''),
          'subreddits': scope.cSR.replace(/ /g, '').split(','),
          'public':  (scope.cPublic || false)
        }).then(function (result) {
          if (result.errors && result.errors.lenth) {
            // something went wrong
          }

          console.log(result);
          $location.url($location.path());
        });
      }
    });
  }

  function validParams(name, subreddits, public) {
    return (name && subreddits);
  };


  return {
    restrict: 'C',
    scope: false,
    link: submitForm
  };
});
