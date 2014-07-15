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
    $httpBackend.when('GET', UserApiService.ENDPOINT + '?token=123&userId=456').respond({redditName: 'jack'});
    $httpBackend.when('GET', UserApiService.ENDPOINT + '/clusters/own?token=123&userId=456').respond([{ name: 'foo' }]);
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('sets the user it got in the request to the scope', function() {
    var ctrl = createController({
      $scope: scope,
      $cookies: cookies,
      $routeParams: { token: '123', user_id: '456', user_name: 'jack' }
    });
    $httpBackend.flush();
    expect(scope.user).toEqual({ redditName: 'jack' });
  });

  it('fetches the users own clusters', function() {
    var ctrl = createController({
      $scope: scope,
      $cookies: cookies,
      $routeParams: { token: '123', user_id: '456', user_name: 'jack' }
    });
    $httpBackend.flush();
    expect(scope.clusters.own).toEqual([ {name: 'foo'} ]);
  });

  it('calls the CookieStore.save method', function() {
    spyOn(CookieStore, 'save').andCallThrough();
    var ctrl = createController({
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
