describe('IndexCtrl Spec', function() {

  beforeEach(module('app'));

  var IndexCtrl, scope, $httpBackend, UserApiService, createController, cookies, $q;
  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    UserApiService = $injector.get('UserApiService');
    ClusterApiService = $injector.get('ClusterApiService');
    AuthService = $injector.get('AuthService');
    $q = $injector.get('$q');

    createController = function(params) {
      return $controller('IndexCtrl', params);
    };
    $httpBackend.when('GET', UserApiService.ENDPOINT + '?token=123&userId=456').respond({redditName: 'jack'});
    $httpBackend.when('GET', ClusterApiService.ENDPOINT + 'public').respond([]);
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var ctrl;
  beforeEach(function() {
    ctrl = createController({
      $scope: scope,
    });
  });

  it('sets the user it got in the request to the scope', function() {
    spyOn(UserApiService, 'getUser').and.callFake(function() {
      var def = $q.defer();
      def.resolve({ redditName: 'jack' });
      return def.promise;
    });
    ctrl = createController({ $scope: scope });
    $httpBackend.flush();
    expect(scope.user).toEqual({ redditName: 'jack' });
  });

  it('sets loggedIn on the scope based on AuthService.loggedIn()', function() {
    spyOn(AuthService, 'loggedIn').and.returnValue(true);
    ctrl = createController({ $scope: scope });
    $httpBackend.flush();
    expect(scope.loggedIn).toEqual(true);
  });

  it('gets the public clusters', function() {
    $httpBackend.flush();
    expect(scope.publicClusters).toEqual([]);
  });
});
