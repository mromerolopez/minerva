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

//  it('should ...', function () {
//    expect(1).toEqual(1);
//  });

    it('New incident must add a location to the array', function () {
        var incidentsLength = scope.incidents.length;
        scope.saveNewIncident({
            name: "Test"
        });
        expect(scope.incidents.length).toEqual(incidentsLength + 1);
    });
});
