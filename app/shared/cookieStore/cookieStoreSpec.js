describe('CookieStore Spec', function () {

  beforeEach(module('app'));

  var CookieStore, cookies;

  var localStorage;
  beforeEach(inject(function($injector) {
    CookieStore = $injector.get('CookieStore');
    localStorage = $injector.get('localStorageService');
    localStorage.clearAll();
  }));

  describe('#save()', function () {
    it('should store token into cookie', function () {
      CookieStore.save({token: '456', user_id: '123', user_name: 'oj206', last_active: 'foo' });
      expect(localStorage.get('userToken')).toEqual('456');
      expect(localStorage.get('userId')).toEqual('123');
      expect(localStorage.get('redditName')).toEqual('oj206');
      expect(localStorage.get('lastActive')).toEqual('foo');
    });
  });

  describe('#loggedIn()', function() {
    it('is false when cookies are not set', function() {
      expect(CookieStore.loggedIn()).toEqual(false);
    });

    it('is true once the user has logged in ', function() {
      CookieStore.save({token: '456', user_id: '123', user_name: 'oj206', last_active: 'foo' });
      expect(CookieStore.loggedIn()).toEqual(true);
    });

    it('is false once the user has logged in then out ', function() {
      CookieStore.save({token: '456', user_id: '123', user_name: 'oj206', last_active: 'foo' });
      expect(CookieStore.loggedIn()).toEqual(true);
      CookieStore.delete();
      expect(CookieStore.loggedIn()).toEqual(false);
    });
  });

  describe('#delete()', function() {
    it('deletes the cookies', function() {
      CookieStore.save({token: '456', user_id: '123', user_name: 'oj206', last_active: 'foo' });
      CookieStore.delete();
      expect(localStorage.get('userToken')).toEqual(undefined);
      expect(localStorage.get('userId')).toEqual(undefined);
      expect(localStorage.get('userName')).toEqual(undefined);
      expect(localStorage.get('lastActive')).toEqual(undefined);
    });
  });
});
