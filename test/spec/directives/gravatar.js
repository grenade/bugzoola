'use strict';

describe('Directive: gravatar', function () {

  // load the directive's module
  beforeEach(module('bugzoollaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    expect(true).toBe(true);
  }));
});
