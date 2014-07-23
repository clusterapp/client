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
      owner: { id: '456' }
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
      owner: { id: '456' }
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
      admins: [ { id: '987' } ]
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

  describe('adding a new admin', function() {
    it('errors if the user is not real', function() {
      $httpBackend.when('GET', UserApiService.ENDPOINT + '/name?name=foo&token=123&userId=456').respond({ errors: ['no user'] });
      scope.edit.admin = 'foo';
      scope.addAdmin();
      $httpBackend.flush();
      expect(scope.addAdminError).toEqual('No user with that name exists');
    });

    it('hits the cluster update endpoint', function() {
      $httpBackend.when('GET', UserApiService.ENDPOINT + '/name?name=foo&token=123&userId=456').respond({ id: '987' });
      $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'name?clusterRoute=jack%2Ffoo&token=123&userId=456').respond({
        id: 'ABC', owner: { id: '456' }, admins: []
      });
      scope.edit.admin = 'foo';
      scope.addAdmin();
      $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?userId=456&token=123&clusterId=ABC', {
        admins: ['987']
      }).respond({});
      $httpBackend.flush();
    });
  });

});
