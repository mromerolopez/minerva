'use strict';

angular.module('minervaApp')
        .controller('XestionUsuariosCtrl', XestionUsuariosCtrl);

function XestionUsuariosCtrl($scope, $rootScope, auth, DTOptionsBuilder, DTColumnDefBuilder, dataBorrowers) {
    $scope.borrowers = [];
    $scope.borrower = new Object;

    dataBorrowers.getBorrowers()
            //get a list of all borrowers
            .then(function (borrowers) {
                $scope.borrowers = borrowers;
            })
            .catch(function (err) {
                console.log(err);
            });

    (function () {
        var opcionesTablaBorrowers = new Object;

        opcionesTablaBorrowers.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');

        opcionesTablaBorrowers.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6),
            DTColumnDefBuilder.newColumnDef(7).notSortable()
        ];

        $scope.opcionesTablaBorrowers = opcionesTablaBorrowers;
    })();

    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };
    })();
}
