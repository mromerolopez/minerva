'use strict';

describe('Controller: TestsCtrl', function () {

  // load the controller's module
  beforeEach(module('minervaApp'));

  var TestsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestsCtrl = $controller('TestsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
