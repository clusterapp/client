describe('IndexCtrl Spec', function() {

  beforeEach(module('app'));

  var IndexCtrl, scope, $httpBackend, UserApiService, createController, cookies;
  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    UserApiService = $injector.get('UserApiService');
    ClusterApiService = $injector.get('ClusterApiService');
    CookieStore = $injector.get('CookieStore');

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
      $cookies: cookies,
      $routeParams: { token: '123', user_id: '456', user_name: 'jack' }
    });
  });

  it('sets the user it got in the request to the scope', function() {
    $httpBackend.flush();
    expect(scope.user).toEqual({ redditName: 'jack' });
  });

  it('sets loggedIn on the scope', function() {
    $httpBackend.flush();
    expect(scope.loggedIn).toEqual(true);
  });

  it('gets the public clusters', function() {
    $httpBackend.flush();
    expect(scope.publicClusters).toEqual([]);
  });

  it('calls the CookieStore.save method', function() {
    spyOn(CookieStore, 'save').andCallThrough();
    // have to call controller here because it needs to be done after the spy
    ctrl = createController({
      $scope: scope,
      $cookies: cookies,
      $routeParams: { token: '123', user_id: '456', user_name: 'jack' }
    });
    $httpBackend.flush();
    expect(CookieStore.save).toHaveBeenCalledWith({
      token: '123',
      user_id: '456',
      user_name: 'jack'
    });
  });
});
