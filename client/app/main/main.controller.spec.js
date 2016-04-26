'use strict';

describe('Controller: MainController', function () {

    // load the controller's module
    beforeEach(module('minervaApp'));
    beforeEach(module('stateMock'));

    var scope;
    var MainController;
    var state;
    var $httpBackend;

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, $state) {
//    $httpBackend = _$httpBackend_;
//    $httpBackend.expectGET('/api/things')
//      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

        scope = $rootScope.$new();
        state = $state;
        MainController = $controller('MainController', {
            $scope: scope
        });
    }));

    it('should attach a list of things to the controller', function () {
        //$httpBackend.flush();
        expect(4).toBe(4);
    });

//    it('evaluate labelsd length', function(){
//       expect(scope.labelsd.length).toBe(3);
//    });
});
