'use strict';

describe('Controller: XestionBibliotecaCtrl', function () {

  // load the controller's module
  beforeEach(module('minervaApp'));

  var XestionBibliotecaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    XestionBibliotecaCtrl = $controller('XestionBibliotecaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
