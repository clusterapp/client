describe('ClusterCtrl Spec', function() {

  beforeEach(module('app'));

  var ClusterCtrl, scope, $httpBackend, createController, ClusterApiService;
  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    AuthService = $injector.get('AuthService');
    ClusterApiService = $injector.get('ClusterApiService');

    createController = function(params) {
      return $controller('ClusterCtrl', params);
    };
  }));


  beforeEach(function() {
    $httpBackend.when('GET', ClusterApiService.ENDPOINT +
                           'name?clusterRoute=jack%2Ffoo&token=123&userId=456').respond({
      id: 'ABC'
    });
    $httpBackend.when('GET', ClusterApiService.ENDPOINT +
                           'listing?clusterId=ABC&token=123&userId=456').respond({});
  });
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var ctrl;
  beforeEach(function() {
    ctrl = createController({
      $scope: scope,
      $routeParams: {
        token: '123', user_id: '456', user_name: 'jack', last_active: 'some date',
        username: 'jack', clusterName: 'foo'
      }
    });
  });

  it('calls getCluster', function() {
    $httpBackend.expectGET(ClusterApiService.ENDPOINT +
                           'name?clusterRoute=jack%2Ffoo&token=123&userId=456').respond({
      id: 'ABC'
    });
    $httpBackend.flush();
    expect(scope.cluster).toEqual({ id: 'ABC' });
  });

  it('gets the cluster listings', function() {
    $httpBackend.expectGET(ClusterApiService.ENDPOINT +
                           'listing?clusterId=ABC&token=123&userId=456').respond([1]);
    $httpBackend.flush();
    expect(scope.listings).toEqual([1]);
  });

});
