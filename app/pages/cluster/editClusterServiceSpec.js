describe('EditClusterService Spec', function() {

  beforeEach(module('app'));

  var UserApiService, $httpBackend, EditClusterService;

  beforeEach(inject(function($injector) {
    UserApiService = $injector.get('UserApiService');
    EditClusterService = $injector.get('EditClusterService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('editAdmin', function() {
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
});
