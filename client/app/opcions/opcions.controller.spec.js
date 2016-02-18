'use strict';

describe('Controller: OpcionsCtrl', function () {

  // load the controller's module
  beforeEach(module('minervaApp'));

  var OpcionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OpcionsCtrl = $controller('OpcionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
