describe('clusterUrlFilter Spec', function() {
  beforeEach(module('app'));

  var filter;

  beforeEach(inject(function($injector) {
    filter = $injector.get('clusterUrlFilter');
  }));

  it('should output the url', function() {
    expect(filter({
      owner: { redditName: 'jack' },
      name: 'code'
    })).toEqual('/jack/code');
  });
});
