angular.module('app')
.config(function ($routeProvider) {

  $routeProvider
  .when('/:username/create', {
    templateUrl: '/pages/create/createTemplate.html',
    controller: 'CreateCtrl',
    reloadOnSearch: false
  });


});
