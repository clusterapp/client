describe('UserApiService Spec', function() {

  beforeEach(module('app'));

  var UserApiService, $httpBackend, AuthService;

  beforeEach(inject(function($injector) {
    UserApiService = $injector.get('UserApiService');
    AuthService = $injector.get('AuthService');
    $httpBackend = $injector.get('$httpBackend');
    spyOn(AuthService, 'get').and.callFake(function(arg) {
      if(arg === 'userId') return '123';
      if(arg === 'userToken') return '456';
    });
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#allUserNames', function() {
    it('hits the /all_names endpoint', function() {
      $httpBackend.expectGET(UserApiService.ENDPOINT + '/all_names?token=456&userId=123').respond();
      UserApiService.allUserNames();
      $httpBackend.flush();
    });
  });

  describe('#getUserByName', function() {
    it('hits the /name endpoint with the name param', function() {
      $httpBackend.expectGET(UserApiService.ENDPOINT + '/name?name=jack&token=456&userId=123').respond();
      UserApiService.getUserByName('jack');
      $httpBackend.flush();
    });
  });

  describe('#getUser()', function() {
    it('should get the users details from the api', function() {
      $httpBackend.expectGET(UserApiService.ENDPOINT + '?token=456&userId=123').respond({});
      UserApiService.getUser();
      $httpBackend.flush();
    });

    it('does not hit the api if the user is already in cookies', function() {
      AuthService.loggedIn = function() { return true; };
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
