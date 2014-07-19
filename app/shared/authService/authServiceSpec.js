describe('AuthService Spec', function () {

  beforeEach(module('app'));

  var AuthService, cookies;

  var localStorage;
  beforeEach(inject(function($injector) {
    AuthService = $injector.get('AuthService');
    localStorage = $injector.get('localStorageService');
    localStorage.clearAll();
  }));

  describe('#save()', function () {
    it('should store token into cookie', function () {
      AuthService.save({token: '456', user_id: '123', user_name: 'oj206', last_active: 'foo' });
      expect(localStorage.get('userToken')).toEqual('456');
      expect(localStorage.get('userId')).toEqual('123');
      expect(localStorage.get('redditName')).toEqual('oj206');
      expect(localStorage.get('lastActive')).toEqual('foo');
    });
  });

  describe('#loggedIn()', function() {
    it('is false when cookies are not set', function() {
      expect(AuthService.loggedIn()).toEqual(false);
    });

    it('is true once the user has logged in ', function() {
      AuthService.save({token: '456', user_id: '123', user_name: 'oj206', last_active: 'foo' });
      expect(AuthService.loggedIn()).toEqual(true);
    });

    it('is false once the user has logged in then out ', function() {
      AuthService.save({token: '456', user_id: '123', user_name: 'oj206', last_active: 'foo' });
      expect(AuthService.loggedIn()).toEqual(true);
      AuthService.delete();
      expect(AuthService.loggedIn()).toEqual(false);
    });
  });

  describe('#delete()', function() {
    it('deletes the cookies', function() {
      AuthService.save({token: '456', user_id: '123', user_name: 'oj206', last_active: 'foo' });
      AuthService.delete();
      expect(localStorage.get('userToken')).toEqual(null);
      expect(localStorage.get('userId')).toEqual(null);
      expect(localStorage.get('userName')).toEqual(null);
      expect(localStorage.get('lastActive')).toEqual(null);
    });
  });
});
