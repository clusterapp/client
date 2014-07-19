angular.module('app')
.filter('redditHtmlCompile', function ($sce) {
  return function (val) {
    return $sce.trustAsHtml(_.unescape(val));
  };
});
