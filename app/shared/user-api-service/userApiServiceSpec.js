describe('UserApiService Spec', function() {

  beforeEach(module('app'));

  var UserApiService, $httpBackend, cookies;
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
    $httpBackend = $injector.get('$httpBackend');
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getUser()', function() {
    it('should get the users details from the api', function() {
      $httpBackend.when('GET', UserApiService.ENDPOINT + '/users?token=456&userId=123').respond({});
      $httpBackend.expectGET(UserApiService.ENDPOINT + '/users?token=456&userId=123');
      UserApiService.getUser();
      $httpBackend.flush();
    });
  });
});
