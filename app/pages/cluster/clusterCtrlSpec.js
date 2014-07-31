describe('ClusterCtrl Spec', function() {

  beforeEach(module('app'));

  var ClusterCtrl, scope, $httpBackend, createController,
  ClusterApiService, UserApiService, toaster, $location,
  UserCanSubscribeService;

  var fakeCluster = function(opts) {
    return {
      subscribers: opts.subscribers || [],
      subreddits: opts.subreddits || [],
      admins: opts.admins || [],
      id: opts.id,
      owner: opts.owner
    };
  };

  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    AuthService = $injector.get('AuthService');
    ClusterApiService = $injector.get('ClusterApiService');
    UserCanSubscribeService = $injector.get('UserCanSubscribeService');
    UserApiService = $injector.get('UserApiService');
    toaster = $injector.get('toaster');
    $location = $injector.get('$location');

    createController = function(params) {
      return $controller('ClusterCtrl', params);
    };
  }));


  var stubEndpoints = function() {
    $httpBackend.when('GET', ClusterApiService.ENDPOINT +
                      'name?clusterRoute=jack%2Ffoo').respond(fakeCluster({
      id: 'ABC',
      owner: { id: '456', redditName: 'jack' } }));
    $httpBackend.when('GET', ClusterApiService.ENDPOINT +
                      'listing?clusterId=ABC').respond({});
  };
  beforeEach(function() {
    stubEndpoints();
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
                           'name?clusterRoute=jack%2Ffoo').respond(fakeCluster({
      id: 'ABC',
      owner: { id: '456' },
    }));
    $httpBackend.flush();
    expect(scope.cluster.id).toEqual('ABC');
  });

  it('sets canEdit to true if the cluster\'s owner is the logged in user', function() {
    spyOn(AuthService, 'get').and.returnValue('456');
    $httpBackend.when('GET', ClusterApiService.ENDPOINT +
                      'name?clusterRoute=jack%2Ffoo').respond(fakeCluster({
      id: 'ABC',
      owner: { id: '456' }
    }));
    $httpBackend.flush();
    expect(scope.canEdit).toEqual(true);
  });

  it('sets canEdit to true if the owner is an admin', function() {
    spyOn(AuthService, 'get').and.returnValue('987');
    ctrl = createController({
      $scope: scope,
      $routeParams: {
        username: 'olly', clusterName: 'foo'
      }
    });
    $httpBackend.expectGET(ClusterApiService.ENDPOINT +
                      'name?clusterRoute=olly%2Ffoo').respond(fakeCluster({
      id: 'ABC',
      owner: { id: '456' },
      admins: [ { id: '987' } ],
    }));
    $httpBackend.expectGET(ClusterApiService.ENDPOINT +
                      'listing?clusterId=ABC').respond({ sorted: [1] });
    $httpBackend.flush();
    expect(scope.canEdit).toEqual(true);
  });

  it('gets the cluster listings', function() {
    $httpBackend.expectGET(ClusterApiService.ENDPOINT +
                           'listing?clusterId=ABC').respond({ sorted: [1] });
    $httpBackend.flush();
    expect(scope.listings.sorted).toEqual([1]);
  });

  describe('editing the list of admins', function() {
    it('makes an update request with the right details', function() {
      $httpBackend.flush();
      scope.tagAdmins = [ { text: 'oj206' } ];
      $httpBackend.expectGET(UserApiService.ENDPOINT + '/name?name=oj206').respond({ id: '987' });
      $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?clusterId=ABC', {
        admins: ['987']
      }).respond({});
      scope.editAdmin();
      $httpBackend.flush();
    });
  });

  describe('editing the list of subreddits', function() {
    it('makes an update with the right details and busts the cache', function() {
      $httpBackend.flush();
      scope.tagSubreddits = [ { text: 'vim' } ];
      $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?clusterId=ABC', {
        subreddits: ['vim']
      }).respond({});
      $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'cache_bust?clusterId=ABC').respond({});
      scope.editSubreddits();
      $httpBackend.flush();
    });
  });
  describe('editing the cluster name', function() {
    it('updates and then redirects', function() {
      spyOn($location, 'path');
      $httpBackend.flush();
      scope.editClusterName = 'foo';
      $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?clusterId=ABC', {
        name: 'foo'
      }).respond({});
      scope.editName();
      $httpBackend.flush();
      expect($location.path).toHaveBeenCalledWith('/jack/foo');
    });
  });

  describe('subscribing to a cluster', function() {
    it('does not let the user subscribe if they cannot', function() {
      spyOn(UserCanSubscribeService, 'canSubscribe').and.returnValue(false);
      $httpBackend.flush();
      expect(scope.userCanSubscribe).toEqual(false);
    });

    it('does let the user subscribe if they can', function() {
      spyOn(UserCanSubscribeService, 'canSubscribe').and.returnValue(true);
      $httpBackend.flush();
      expect(scope.userCanSubscribe).toEqual(true);
    });

    it('sets the right properties on the scope', function() {
      spyOn(AuthService, 'get').and.returnValue('456');
      spyOn(AuthService, 'getUser').and.returnValue({ id: '456' });
      $httpBackend.expectGET(ClusterApiService.ENDPOINT +
                        'name?clusterRoute=jack%2Ffoo').respond(fakeCluster({
        id: 'ABC',
        owner: { id: '987', redditName: 'jack' },
        subscribers: [{ id: '456' }]
      }));
      $httpBackend.flush();
      expect(scope.userIsSubscribed).toEqual(true);
      expect(scope.userCanSubscribe).toEqual(false);
    });

    it('updates the scope properly when the user unsubscribes', function() {
      spyOn(AuthService, 'get').and.returnValue('456');
      spyOn(AuthService, 'getUser').and.returnValue({ id: '456' });
      $httpBackend.expectGET(ClusterApiService.ENDPOINT +
                        'name?clusterRoute=jack%2Ffoo').respond(fakeCluster({
        id: 'ABC',
        owner: { id: '987', redditName: 'jack' },
        subscribers: [{ id: '456' }]
      }));
      $httpBackend.flush();
      $httpBackend.expectPOST(ClusterApiService.ENDPOINT +
                              'update?clusterId=ABC', {
        subscribers: []
      }).respond({});
      scope.editSubscriber();
      $httpBackend.flush();
      expect(scope.userIsSubscribed).toEqual(false);
      expect(scope.userCanSubscribe).toEqual(true);
    });
  });

});
