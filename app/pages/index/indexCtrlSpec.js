describe('IndexCtrl Spec', function() {

  beforeEach(module('app'));

  var IndexCtrl, scope, $httpBackend, UserApiService, createController, cookies;
  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    UserApiService = $injector.get('UserApiService');
    ClusterApiService = $injector.get('ClusterApiService');
    AuthService = $injector.get('AuthService');

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
      $routeParams: {
        token: '123', user_id: '456',
        user_name: 'jack', last_active: 'Thu Jul 17 2014 22:49:26 GMT+0100 (BST)' }
    });
  });

  it('sets the user it got in the request to the scope', function() {
    $httpBackend.flush();
    expect(scope.user).toEqual({
      redditName: 'jack',
      id: '456',
      lastActive: 'Thu Jul 17 2014 22:49:26 GMT+0100 (BST)',
      token: '123'
    });
  });

  it('sets loggedIn on the scope based on AuthService.loggedIn()', function() {
    $httpBackend.flush();
    expect(scope.loggedIn).toEqual(true);
  });

  it('gets the public clusters', function() {
    $httpBackend.flush();
    expect(scope.publicClusters).toEqual([]);
  });

  it('calls the AuthService.save method', function() {
    spyOn(AuthService, 'save').and.callThrough();
    // have to call controller here because it needs to be done after the spy
    ctrl = createController({
      $scope: scope,
      $cookies: cookies,
      $routeParams: {
        token: '123', user_id: '456',
        user_name: 'jack', last_active: 'Thu Jul 17 2014 22:49:26 GMT+0100 (BST)' }
    });
    $httpBackend.flush();
    expect(AuthService.save).toHaveBeenCalledWith({
      token: '123',
      user_id: '456',
      user_name: 'jack',
      last_active: 'Thu Jul 17 2014 22:49:26 GMT+0100 (BST)'
    });
  });
});
