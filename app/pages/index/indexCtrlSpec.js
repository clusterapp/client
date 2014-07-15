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
    $httpBackend.when('GET', UserApiService.ENDPOINT + '/clusters/admin?token=123&userId=456').respond([{ name: 'bar' }]);
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

  it('fetches the users own clusters', function() {
    $httpBackend.flush();
    expect(scope.clusters.own).toEqual([ {name: 'foo'} ]);
  });

  it('fetches the users admin clusters', function() {
    $httpBackend.flush();
    expect(scope.clusters.admin).toEqual([ {name: 'bar'} ]);
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
