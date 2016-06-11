'use strict';

describe('Controller: BookDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('minervaApp'));

  var BookDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookDetailCtrl = $controller('BookDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
