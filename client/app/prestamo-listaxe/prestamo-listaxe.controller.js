'use strict';

angular.module('minervaApp')
        .controller('PrestamoListaxeCtrl', function ($scope, $rootScope, auth, DTOptionsBuilder, DTColumnDefBuilder, dataLoans) {
            $scope.loans = [];
            $scope.loan = new Object;
            $scope.editingLoan = false;


            $scope.newLoan = function () {
                $scope.loan = new Object;
            };

            dataLoans.getLoans()
                    .then(function (loans) {
                        $scope.loans = loans;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

            $scope.editLoan = function (loan) {
                $scope.editingLoan = true;
                $scope.loan = loan;
                $scope.book = loan.book;
                $scope.borrower = loan.borrower;
            };

            $scope.cancelEditLoan = function () {
                $scope.editingLoan = false;
            };

            (function () {
                var optionsTableLoans = new Object;

                optionsTableLoans.dtOptions = DTOptionsBuilder
                        .newOptions().withPaginationType('full_numbers')
                        .withDisplayLength(10)
                        .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');

                optionsTableLoans.dtColumnDefs = [
                    DTColumnDefBuilder.newColumnDef(0),
                    DTColumnDefBuilder.newColumnDef(1),
                    DTColumnDefBuilder.newColumnDef(2),
                    DTColumnDefBuilder.newColumnDef(3),
                    DTColumnDefBuilder.newColumnDef(4),
                    DTColumnDefBuilder.newColumnDef(5),
                    DTColumnDefBuilder.newColumnDef(6),
                    DTColumnDefBuilder.newColumnDef(7),
                    DTColumnDefBuilder.newColumnDef(8),
                    DTColumnDefBuilder.newColumnDef(9).notSortable()
                ];

                $scope.optionsTableLoans = optionsTableLoans;
            })();

            (function () {
                $rootScope.user = auth.get_user();
                $rootScope.login = false;
                $rootScope.salir = function () {
                    auth.logout();
                };
            })();

        });
