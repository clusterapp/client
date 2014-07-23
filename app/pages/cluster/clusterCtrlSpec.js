describe('ClusterCtrl Spec', function() {

  beforeEach(module('app'));

  var ClusterCtrl, scope, $httpBackend, createController, ClusterApiService, UserApiService;
  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    AuthService = $injector.get('AuthService');
    ClusterApiService = $injector.get('ClusterApiService');
    UserApiService = $injector.get('UserApiService');

    createController = function(params) {
      return $controller('ClusterCtrl', params);
    };
  }));


  beforeEach(function() {
    $httpBackend.when('GET', ClusterApiService.ENDPOINT +
                           'name?clusterRoute=jack%2Ffoo&token=123&userId=456').respond({
      id: 'ABC',
      owner: { id: '456' },
      subreddits: [],
      admins: []
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
      id: 'ABC',
      owner: { id: '456' },
      subreddits: [],
      admins: []
    });
    $httpBackend.flush();
    expect(scope.cluster.id).toEqual('ABC');
  });

  it('sets canEdit to true if the cluster\'s owner is the logged in user', function() {
    $httpBackend.when('GET', ClusterApiService.ENDPOINT +
                           'name?clusterRoute=jack%2Ffoo&token=123&userId=456').respond({
      id: 'ABC',
      owner: { id: '456' }
    });
    $httpBackend.flush();
    expect(scope.canEdit).toEqual(true);
  });

  it('sets canEdit to true if the owner is an admin', function() {
    ctrl = createController({
      $scope: scope,
      $routeParams: {
        token: '123', user_id: '987', user_name: 'jack', last_active: 'some date',
        username: 'olly', clusterName: 'foo'
      }
    });
    $httpBackend.when('GET', ClusterApiService.ENDPOINT +
                           'name?clusterRoute=olly%2Ffoo&token=123&userId=987').respond({
      id: 'ABC',
      owner: { id: '456' },
      admins: [ { id: '987' } ],
      subreddits: []
    });
    $httpBackend.when('GET', ClusterApiService.ENDPOINT +
                           'listing?clusterId=ABC&token=123&userId=987').respond({ sorted: [1] });
    $httpBackend.flush();
    expect(scope.canEdit).toEqual(true);
  });

  it('gets the cluster listings', function() {
    $httpBackend.expectGET(ClusterApiService.ENDPOINT +
                           'listing?clusterId=ABC&token=123&userId=456').respond({ sorted: [1] });
    $httpBackend.flush();
    expect(scope.listings.sorted).toEqual([1]);
  });

});
