'use strict';

describe('Controller: DocumentosCtrl', function () {

  // load the controller's module
  beforeEach(module('minervaApp'));

  var DocumentosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DocumentosCtrl = $controller('DocumentosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
