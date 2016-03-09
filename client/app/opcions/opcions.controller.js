'use strict';

app.controller('OpcionsCtrl', OpcionsCtrl);

function OpcionsCtrl($scope, $rootScope, auth, DTOptionsBuilder, DTColumnDefBuilder, dataConfiguration) {
    $scope.modal = false;
    $scope.location = new Object;
    $scope.locations = [];

    $scope.newLocation = function (location) {
        dataConfiguration.getConfiguration(location)
                .then(function (newLocation) {
                    $scope.locations.push(newLocation);
                    $scope.editingLocation = false;
                }).catch(function (err) {
            console.log(err);
        });
    };

    $scope.editLocation = function (location) {
        $scope.location = location;
        $scope.editingLocation = true;

    };


    $scope.saveLocation = function () {


    };

    $scope.cancelLocation = function () {
        $scope.location = new Object;
        $scope.editingLocation = false;
    };



    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };
    })();
    $scope.oneAtATime = true;
    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];
    $scope.items = ['Item 1', 'Item 2', 'Item 3'];
    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };
    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
    (function () {
        var opcionesTablaLocations = new Object;
        opcionesTablaLocations.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');
        opcionesTablaLocations.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1).notSortable(),
            DTColumnDefBuilder.newColumnDef(2).notSortable()
        ];
        $scope.opcionesTablaLocations = opcionesTablaLocations;
    })();
}

