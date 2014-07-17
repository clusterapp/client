describe('UserApiService Spec', function() {

  beforeEach(module('app'));

  var UserApiService, $httpBackend, cookie, CookieStore;
  // this is how we can mock entire dependencies
  beforeEach(module(function($provide) {
    cookies = {
      userId: '123',
      userToken: '456'
    }
    $provide.value('$cookies', cookies);
  }));

  beforeEach(inject(function($injector) {
    UserApiService = $injector.get('UserApiService');
    CookieStore = $injector.get('CookieStore');
    $httpBackend = $injector.get('$httpBackend');
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getUser()', function() {
    it('should get the users details from the api', function() {
      $httpBackend.expectGET(UserApiService.ENDPOINT + '?token=456&userId=123').respond({});
      UserApiService.getUser();
      $httpBackend.flush();
    });

    it('does not hit the api if the user is already in cookies', function() {
      CookieStore.loggedIn = function() { return true; };
      UserApiService.getUser();
      // this would error if a http req was made, so the fact that it doesnt means the test passes
    });
  });

  describe('#getUserOwnClusters()', function() {
    it('should make a request to /users/owner', function() {
      $httpBackend.expectGET(UserApiService.ENDPOINT + '/clusters/own?token=456&userId=123').respond({});
      UserApiService.getUserOwnClusters();
      $httpBackend.flush();
    });
  });

  describe('#getUserAdminClusters()', function() {
    it('should make a request to /users/admin', function() {
      $httpBackend.expectGET(UserApiService.ENDPOINT + '/clusters/admin?token=456&userId=123').respond({});
      UserApiService.getUserAdminClusters();
      $httpBackend.flush();
    });
  });

  describe('#getUserSubscribedClusters()', function() {
    it('should make a request to /users/subscribed', function() {
      $httpBackend.expectGET(UserApiService.ENDPOINT + '/clusters/subscribed?token=456&userId=123').respond({});
      UserApiService.getUserSubscribedClusters();
      $httpBackend.flush();
    });
  });
});
