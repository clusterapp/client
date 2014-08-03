angular.module('app')
.filter('htmlGen', function () {
  return function(input) {
    input = input.replace(/&lt;/g, '<');
    input = input.replace(/&gt;/g, '>');
    return input
  }
});
