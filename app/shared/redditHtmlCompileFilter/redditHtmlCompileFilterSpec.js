describe('redditHtmlCompileFilter Spec', function() {
  beforeEach(module('app'));

  var filter;

  beforeEach(inject(function($injector) {
    filter = $injector.get('redditHtmlCompileFilter');
  }));

  it('should unescape the html', function() {
    expect(filter('&lt;p&gt;hello&lt;/p&gt;').$$unwrapTrustedValue()).toEqual('<p>hello</p>');
  });
});
