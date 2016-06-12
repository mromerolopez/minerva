'use strict';

describe('Controller: LembrarContrasinalCtrl', function () {

  // load the controller's module
  beforeEach(module('minervaApp'));

  var LembrarContrasinalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LembrarContrasinalCtrl = $controller('LembrarContrasinalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
