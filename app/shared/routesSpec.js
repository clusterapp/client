describe('Testing routes', function() {
  beforeEach(module('app'));

  var location, route, rootScope, httpBackend;
  beforeEach(inject(function($location, $route, $rootScope, $httpBackend) {
    location = $location;
    route = $route;
    rootScope = $rootScope;
    httpBackend = $httpBackend;

  }));

  describe('routing', function() {
    it('uses IndexCtrl for /', function() {
      httpBackend.expectGET('/pages/index/indexTemplate.html').respond('hello world');
      location.path('/');
      rootScope.$digest();
      expect(route.current.controller).toBe('IndexCtrl');
    });

    it('uses LogoutCtrl for /logout', function() {
      location.path('/logout');
      rootScope.$digest();
      expect(route.current.controller).toBe('LogoutCtrl');
    });

    it('uses UserProfileCtrl for /:username', function() {
      httpBackend.expectGET('/pages/user-profile/userProfileTemplate.html').respond('hello world');
      location.path('/jackfranklin');
      rootScope.$digest();
      expect(route.current.controller).toBe('UserProfileCtrl');
    });

    it('uses CreateCtrl for /:username/create', function() {
      httpBackend.expectGET('/pages/create/createTemplate.html').respond('hello world');
      location.path('/jackfranklin/create');
      rootScope.$digest();
      expect(route.current.controller).toBe('CreateCtrl');
    });

    it('uses ClusterCtrl for /:username/:clusterName', function() {
      httpBackend.expectGET('/pages/cluster/clusterTemplate.html').respond('hello world');
      location.path('/jackfranklin/foo');
      rootScope.$digest();
      expect(route.current.controller).toBe('ClusterCtrl');
    });

    it('redirects to / for any other route', function() {
      httpBackend.expectGET('/pages/index/indexTemplate.html').respond('hello world');
      location.path('/blah/flkshfkdfj/blah');
      rootScope.$digest();
      expect(route.current.controller).toBe('IndexCtrl');
    });
  });
});
