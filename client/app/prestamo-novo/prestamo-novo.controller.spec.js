'use strict';

describe('Controller: PrestamoNovoCtrl', function () {

  // load the controller's module
  beforeEach(module('minervaApp'));

  var PrestamoNovoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrestamoNovoCtrl = $controller('PrestamoNovoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
