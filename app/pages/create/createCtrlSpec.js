describe('CreateCtrl Spec', function () {

  beforeEach(module('app'));


  var CreateCtrl, scope, $httpBackend, ClusterApiService, $location;


  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    ClusterApiService = $injector.get('ClusterApiService');
    $location = $injector.get('$location');
    CreateCtrl = function(params) {
      return $controller('CreateCtrl', params);
    };
  }));


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  beforeEach(function() {
    ctrl = CreateCtrl({
      $scope: scope
    });
  });

  describe('creating a cluster', function () {
    it('creates and then redirects to cluster', function () {
      spyOn($location, 'path');
      scope.cName = 'foobar';
      scope.cSR = 'vim';
      scope.cPublic = false;

      $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'create', {
        'name': 'foobar',
        'subreddits': ['vim'],
        'public': false
      }).respond({
        owner: {
          redditName: 'oj206'
        },
        name: 'foobar'
      });

      scope.createCluster();
      $httpBackend.flush();
      expect($location.path).toHaveBeenCalledWith('/oj206/foobar');
    });
  });
});
