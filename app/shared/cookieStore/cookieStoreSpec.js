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
      CookieStore.save({token: '456', user_id: '123', user_name: 'oj206' });
      expect(cookies).toEqual({
        userToken: '456',
        userId: '123',
        userName: 'oj206'
      });
    });
  });

  describe('#loggedIn()', function() {
    it('is false when cookies are not set', function() {
      expect(CookieStore.loggedIn()).toEqual(false);
    });

    it('is true once the user has logged in ', function() {
      CookieStore.save({token: '456', user_id: '123', user_name: 'oj206' });
      expect(CookieStore.loggedIn()).toEqual(true);
    });
  });

  describe('#delete()', function() {
    it('deletes the cookies', function() {
      CookieStore.save({token: '456', user_id: '123', user_name: 'oj206' });
      CookieStore.delete();
      expect(cookies.userToken).toEqual(undefined);
      expect(cookies.userId).toEqual(undefined);
      expect(cookies.userName).toEqual(undefined);
    });
  });
});
