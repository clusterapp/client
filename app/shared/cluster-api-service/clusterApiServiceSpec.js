describe('ClusterApiService Spec', function () {

  beforeEach(module('app'));

  var ClusterApiService, $httpBackend, AuthService;


  beforeEach(inject(function($injector) {
    ClusterApiService = $injector.get('ClusterApiService');
    $httpBackend = $injector.get('$httpBackend');
    AuthService = $injector.get('AuthService');
    spyOn(AuthService, 'get').and.callFake(function(arg) {
      if(arg === 'id') return '123';
    });
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('#create()', function() {
    it('should create a cluster, and return the new created cluster', function() {

      $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'create', {
        owner: '123',
        name: 'testcluster',
        subreddits: ['vim', 'angularjs'],
        public: false
      }).respond(200, {});

      ClusterApiService.create({
        name: 'testcluster',
        subreddits: ['vim', 'angularjs'],
        public: false
      });

      $httpBackend.flush();
    });
  });

  describe('#update()', function() {
    it('calls update endpoint', function() {
      $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?clusterId=123', {
        admins: ['ABC123']
      }).respond(200, {});

      ClusterApiService.update('123', {
        admins: ['ABC123']
      });

      $httpBackend.flush();
    });
  });

  describe('#getCluster()', function() {
    it('makes a get request', function() {
      $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'name?clusterRoute=foo').respond(200, {});
      ClusterApiService.getCluster('foo');
      $httpBackend.flush();
    });
  });

  describe('#getListings()', function() {
    it('makes a get request', function() {
      $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'listing?clusterId=abc').respond(200, {});
      ClusterApiService.getListings('abc');
      $httpBackend.flush();
    });

    it('adds in the after parameters correctly', function() {
      $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'listing?after_vim=foo&clusterId=abc').respond(200, {});
      ClusterApiService.getListings('abc', {
        vim: 'foo'
      });
      $httpBackend.flush();
    });
  });

  describe('#getPublic()', function() {
    it('makes a get request', function() {
      $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'public').respond(200, {});
      ClusterApiService.getPublic();
      $httpBackend.flush();
    });
  });

  describe('#bustCAche()', function() {
    it('hits the cache bust end point', function() {
      $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'cache_bust?clusterId=987').respond(200, {});
      ClusterApiService.bustCache('987');
      $httpBackend.flush();
    });
  });

});
