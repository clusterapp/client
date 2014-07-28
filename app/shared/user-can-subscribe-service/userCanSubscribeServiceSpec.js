describe('UserCanSubscribeService Spec', function () {

  beforeEach(module('app'));

  var UserCanSubscribeService;

  beforeEach(inject(function($injector) {
    UserCanSubscribeService = $injector.get('UserCanSubscribeService');
  }));

  describe('#canSubscribe()', function() {
    it('returns true if the user is not admin or owner and the cluster is public', function() {
      var res = UserCanSubscribeService.canSubscribe({
        id: 'abcd'
      }, {
        public: true,
        admins: [],
        subscribers: [],
        owner: 'cdef'
      });
      expect(res).toEqual(true);
    });

    it('returns false if the user is already subscribed', function() {
      expect(UserCanSubscribeService.canSubscribe({
        id: 'abcd'
      }, {
        admins: [],
        owner: '456',
        public: true,
        subscribers: ['abcd']
      })).toEqual(false);

    });

    it('returns false if the user is an admin', function() {
      expect(UserCanSubscribeService.canSubscribe({
        id: 'abcd'
      }, {
        admins: ['abcd'],
        public: true
      })).toEqual(false);
    });

    it('returns false if the cluster is not public', function() {
      expect(UserCanSubscribeService.canSubscribe({
        id: 'abcd'
      }, {
        public: false
      })).toEqual(false);
    });

    it('returns false if the user is the owner', function() {
       expect(UserCanSubscribeService.canSubscribe({
        id: 'abcd'
      }, {
        owner: 'abcd',
        public: true,
        admins: [],
      })).toEqual(false);
    });
  });
});
