describe('EditClusterService Spec', function() {

  beforeEach(module('app'));

  var UserApiService, $httpBackend, EditClusterService, ClusterApiService;

  beforeEach(inject(function($injector) {
    UserApiService = $injector.get('UserApiService');
    EditClusterService = $injector.get('EditClusterService');
    ClusterApiService = $injector.get('ClusterApiService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('editAdmin', function() {
    describe('updating the admin list', function() {
      it('updates the progress bar', function() {
        var progressBar = { start: function() {}, done: function() {} };
        spyOn(progressBar, 'start');
        spyOn(progressBar, 'done');
        $httpBackend.whenGET(UserApiService.ENDPOINT + '/name?name=oj206&token=123&userId=456').respond({ id: '987' });
        $httpBackend.whenPOST(ClusterApiService.ENDPOINT + 'update?userId=456&token=123&clusterId=ABC', {
          admins: ['987']
        }).respond({});
        EditClusterService.editAdmin.update({
          progressBar: progressBar,
          cluster: { id: 'ABC' },
          adminNames: ['oj206'],
          notifier: { pop: function() {} }
        });
        $httpBackend.flush();
        expect(progressBar.start).toHaveBeenCalled();
        expect(progressBar.done).toHaveBeenCalled();
      });
      it('calls the notifier when the admin has been updated', function() {
        var notifier = { pop: function() {} };
        spyOn(notifier, 'pop');
        $httpBackend.whenGET(UserApiService.ENDPOINT + '/name?name=oj206&token=123&userId=456').respond({ id: '987' });
        $httpBackend.whenPOST(ClusterApiService.ENDPOINT + 'update?userId=456&token=123&clusterId=ABC', {
          admins: ['987']
        }).respond({});
        EditClusterService.editAdmin.update({
          progressBar: { start: function() {}, done: function() {} },
          cluster: { id: 'ABC' },
          adminNames: ['oj206'],
          notifier: notifier
        });
        $httpBackend.flush();
        expect(notifier.pop).toHaveBeenCalled();
      });
      it('makes a POST to /cluster/update', function() {
        $httpBackend.whenGET(UserApiService.ENDPOINT + '/name?name=oj206&token=123&userId=456').respond({ id: '987' });
        $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?userId=456&token=123&clusterId=ABC', {
          admins: ['987']
        }).respond({});
        EditClusterService.editAdmin.update({
          progressBar: { start: function() {}, done: function() {} },
          cluster: { id: 'ABC' },
          adminNames: ['oj206'],
          notifier: { pop: function() {} }
        });
        $httpBackend.flush();
      });
    });

    describe('usernames for auto complete', function() {
      beforeEach(function() {
        $httpBackend.expectGET(UserApiService.ENDPOINT + '/all_names?token=123&userId=456').respond(['jack', 'dave', 'ollie']);
      });

      it('does not include the owners name in the list', function(done) {
        EditClusterService.editAdmin.userNamesForAutocomplete({
          redditName: 'jack'
        }).then(function(names) {
          expect(names.indexOf('jack')).toEqual(-1);
          done();
        });
        $httpBackend.flush();
      });
    });
  });

  describe('editClusterName', function() {
    it('makes the expected request to update', function() {
        $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?userId=456&token=123&clusterId=ABC', {
          name: 'foo'
        }).respond({});
        EditClusterService.editClusterName.update({
          progressBar: { start: function() {}, done: function() {} },
          cluster: { id: 'ABC' },
          notifier: { pop: function() {} },
          name: 'foo'
        });
        $httpBackend.flush();
    });
  });
  describe('editSubreddits', function() {
    describe('update', function() {
      it('shows a notification on success', function() {
        var notifier = { pop: function() {} };
        spyOn(notifier, 'pop');
        $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?userId=456&token=123&clusterId=ABC', {
          subreddits: ['vim']
        }).respond({});
        $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'cache_bust?clusterId=ABC&token=123&userId=456').respond({});
        EditClusterService.editSubreddits.update({
          progressBar: { start: function() {}, done: function() {} },
          cluster: { id: 'ABC' },
          notifier: notifier,
          subreddits: [ 'vim' ],
        });
        $httpBackend.flush();
        expect(notifier.pop).toHaveBeenCalled();
      });

      it('calls the afterComplete function if one is given', function() {
        var after = jasmine.createSpy('after');
        $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?userId=456&token=123&clusterId=ABC', {
          subreddits: ['vim']
        }).respond({});
        $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'cache_bust?clusterId=ABC&token=123&userId=456').respond({});
        EditClusterService.editSubreddits.update({
          progressBar: { start: function() {}, done: function() {} },
          cluster: { id: 'ABC' },
          notifier: { pop: function() {} },
          subreddits: [ 'vim' ],
          afterComplete: after
        });
        $httpBackend.flush();
        expect(after).toHaveBeenCalled();
      });

      it('makes the request to the expected update endpoint and clears the cache', function() {
        $httpBackend.expectPOST(ClusterApiService.ENDPOINT + 'update?userId=456&token=123&clusterId=ABC', {
          subreddits: ['vim']
        }).respond({});
        $httpBackend.expectGET(ClusterApiService.ENDPOINT + 'cache_bust?clusterId=ABC&token=123&userId=456').respond({});
        EditClusterService.editSubreddits.update({
          progressBar: { start: function() {}, done: function() {} },
          cluster: { id: 'ABC' },
          notifier: { pop: function() {} },
          subreddits: [ 'vim' ]
        });
        $httpBackend.flush();


      });
    });

  });
});
