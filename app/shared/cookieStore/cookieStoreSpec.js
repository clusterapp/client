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
});
