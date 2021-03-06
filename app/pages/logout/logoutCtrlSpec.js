describe('LogOutCtrl Spec', function() {

  beforeEach(module('app'));

  var LogoutCtrl, $httpBackend, createController, AuthService;
  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    AuthService = $injector.get('AuthService');

    createController = function(params) {
      return $controller('LogoutCtrl', params);
    };
    $httpBackend.when('GET', '/_logout').respond({});
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var ctrl;

  it('calls the /_logout endpoint on the server', function() {
    $httpBackend.expectGET('/_logout').respond({});
    ctrl = createController({
      $scope: scope,
      // have to do this because the tests can't deal with a full page reload
      $window: { location: { reload: function() {} } }
    });
    $httpBackend.flush();
  });
});
