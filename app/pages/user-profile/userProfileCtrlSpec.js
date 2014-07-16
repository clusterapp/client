describe('UserProfileCtrl Spec', function() {

  beforeEach(module('app'));

  var IndexCtrl, scope, $httpBackend, UserApiService, createController, cookies;
  beforeEach(module(function($provide) {
    cookies = {
      userId: '456',
      userToken: '123'
    }
    $provide.value('$cookies', cookies);
  }));

  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    UserApiService = $injector.get('UserApiService');

    createController = function(params) {
      return $controller('UserProfileCtrl', params);
    };

    $httpBackend.when('GET', UserApiService.ENDPOINT + '?token=123&userId=456').respond({redditName: 'jack'});
    $httpBackend.when('GET', UserApiService.ENDPOINT + '/clusters/own?token=123&userId=456').respond([{ name: 'foo' }]);
    $httpBackend.when('GET', UserApiService.ENDPOINT + '/clusters/admin?token=123&userId=456').respond([{ name: 'bar' }]);
    $httpBackend.when('GET', UserApiService.ENDPOINT + '/clusters/subscribed?token=123&userId=456').respond([{ name: 'baz' }]);
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var ctrl;
  beforeEach(function() {
    ctrl = createController({
      $scope: scope,
      $cookies: cookies
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

  it('fetches the users subscribed clusters', function() {
    $httpBackend.flush();
    expect(scope.clusters.subscribed).toEqual([ {name: 'baz'} ]);
  });
});
