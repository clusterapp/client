describe('CookieStore Spec', function () {

  beforeEach(module('app'));

  var CookieStore, cookies;

  beforeEach(module(function($provide) {
    cookies = {};
    $provide.value('$cookies', cookies);
  }));

  beforeEach(inject(function($injector) {
    CookieStore = $injector.get('CookieStore');
  }));

  describe('#save()', function () {
    it('should store token into cookie', function () {
      CookieStore.save({token: '456', user_id: '123', user_name: 'oj206', last_active: 'foo' });
      expect(cookies).toEqual({
        userToken: '456',
        userId: '123',
        redditName: 'oj206',
        lastActive: 'foo'
      });
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
      expect(cookies.userToken).toEqual(undefined);
      expect(cookies.userId).toEqual(undefined);
      expect(cookies.userName).toEqual(undefined);
      expect(cookies.lastActive).toEqual(undefined);
    });
  });
});
