describe('ClusterApiService Spec', function () {


  beforeEach(module('app'));

  var ClusterApiService, $httpBackend, cookies;

  beforeEach(module(function($provide) {
    cookies = {
      userId: '123',
      userToken: '456'
    }
    $provide.value('$cookies', cookies);
  }));


  beforeEach(inject(function($injector) {
    ClusterApiService = $injector.get('ClusterApiService');
    $httpBackend = $injector.get('$httpBackend');
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('#create()', function() {
    it('should create a cluster, and return the new created cluster', function() {

      $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'create?userId=123&token=456', {
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

  describe('#getCluster()', function() {
    it('makes a get request', function() {
      $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'name?clusterRoute=foo&token=456&userId=123').respond(200, {});
      ClusterApiService.getCluster('foo');
      $httpBackend.flush();
    });
  });

  describe('#getListings()', function() {
    it('makes a get request', function() {
      $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'listing?clusterId=abc&token=456&userId=123').respond(200, {});
      ClusterApiService.getListings('abc');
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

});
