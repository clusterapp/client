describe('UserProfileCtrl Spec', function() {

  beforeEach(module('app'));

  var IndexCtrl, scope, $httpBackend, UserApiService, createController, AuthService, $q;
  beforeEach(inject(function($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    UserApiService = $injector.get('UserApiService');
    AuthService = $injector.get('AuthService');
    $q = $injector.get('$q');

    AuthService.get = function(param) {
      if(param === 'userId') return '456';
      if(param === 'userToken') return '123';
    };

    createController = function(params) {
      return $controller('UserProfileCtrl', params);
    };

    $httpBackend.when('GET', UserApiService.ENDPOINT + '/clusters/own').respond([{ name: 'foo' }]);
    $httpBackend.when('GET', UserApiService.ENDPOINT + '/clusters/admin').respond([{ name: 'bar' }]);
    $httpBackend.when('GET', UserApiService.ENDPOINT + '/clusters/subscribed').respond([{ name: 'baz' }]);
    spyOn(UserApiService, 'getUser').and.callFake(function() {
      var def = $q.defer();
      def.resolve({ redditName: 'jack' });
      return def.promise;
    });
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
