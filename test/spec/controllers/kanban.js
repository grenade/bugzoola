'use strict';

describe('Controller: KanbanCtrl', function () {

  // load the controller's module
  beforeEach(module('bugzoollaApp'));

  var KanbanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KanbanCtrl = $controller('KanbanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KanbanCtrl.awesomeThings.length).toBe(3);
  });
});
