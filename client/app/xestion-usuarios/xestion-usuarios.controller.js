'use strict';

angular.module('minervaApp')
        .controller('XestionUsuariosCtrl', XestionUsuariosCtrl);

function XestionUsuariosCtrl($scope, $rootScope, auth, DTOptionsBuilder, DTColumnDefBuilder, dataBorrowers) {
    $scope.borrowers = [];
    $scope.borrower = new Object;
    $scope.loan = new Object;
    $scope.editingBorrower = false;
    $scope.creatingLoan = false;

    dataBorrowers.getBorrowers()
            //get a list of all borrowers
            .then(function (borrowers) {
                $scope.borrowers = borrowers;
            })
            .catch(function (err) {
                console.log(err);
            });

    $scope.saveBorrower = function (borrower) {


        if (typeof borrower._id !== 'undefined') {
            //updates the actual user
            dataBorrowers.saveBorrower(borrower)
                    .then(function (modifiedBorrower) {
                        $scope.editingBorrower = false;
                    }).catch(function (err) {
                console.log(err);
            });
        } else {
            // create user
            borrower.parent = auth.get_user()._id;
            dataBorrowers.addBorrower(borrower)
                    .then(function (newBorrower) {
                        $scope.editingBorrower = false;
                        $scope.borrowers.push(newBorrower);
                    }).catch(function (err) {
                console.log(err);
            });
        }

    };


    $scope.editBorrower = function (borrower) {
        $scope.borrower = borrower;
        $scope.editingBorrower = true;
        if (typeof borrower === 'undefined') {
            $scope.borrower = new Object;
            $scope.borrower.active = true;
        }

    };

    $scope.cancelEditingBorrower = function () {
        $scope.borrower = new Object;
        $scope.editingBorrower = false;
    };

    $scope.newLoan = function (borrower) {
        $scope.creatingLoan = true;
        $scope.borrower = borrower;
    };

    $scope.cancelNewLoan = function () {
        $scope.creatingLoan = false;
        $scope.borrower = new Object;
        $scope.loan = new Object;
    };


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
