describe('IndexCtrl Spec', function() {

  beforeEach(module('app'));

  var IndexCtrl, scope, $httpBackend, UserApiService, createController, cookies;
  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    UserApiService = $injector.get('UserApiService');
    CookieStore = $injector.get('CookieStore');
    createController = function(params) {
      return $controller('IndexCtrl', params);
    };
    $httpBackend.when('GET', UserApiService.ENDPOINT + '/users?userId=456&userToken=123').respond({redditName: 'jack'});
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // it('sets the cookies if they are in route params', function() {
  //   var ctrl = createController({
  //     $scope: scope,
  //     $cookies: cookies,
  //     $routeParams: { token: '123', user_id: '456', user_name: 'jack' }
  //   });
  //   expect(cookies).toEqual({
  //     userToken: '123',
  //     userId: '456',
  //     userName: 'jack'
  //   });
  //   $httpBackend.flush();
  // });

  // it('does not set cookies if no route params', function() {
  //   var ctrl = createController({
  //     $scope: scope,
  //     $cookies: cookies,
  //     $routeParams: {}
  //   });
  //   expect(cookies).toEqual({});
  // });
});
