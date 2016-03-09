'use strict';

app.controller('PrestamoListaxeCtrl', PrestamoListaxeCtrl);

function PrestamoListaxeCtrl($scope, $rootScope, auth, DTOptionsBuilder, DTColumnDefBuilder, dataLoans, dataIncidents, SweetAlert) {
    $scope.loans = [];
    $scope.loan = new Object;
    $scope.editingLoan = false;
    $scope.incidences = [];
    $scope.incidence = new Object;

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
        $scope.incidences=loan.incidents;
    };

    $scope.cancelEditLoan = function () {
        $scope.editingLoan = false;
    };

    $scope.newIncidence = function () {
        $scope.incidence = new Object;
        $scope.incidence.loan = $scope.loan._id;
        $scope.incidence.book = $scope.loan.book._id;
        $scope.incidence.borrower = $scope.loan.borrower._id;
    };

    $scope.saveIncidence = function (incidence) {
        dataIncidents.addIncident(incidence)
                .then(function (incidence) {
                    $scope.incidences.push(incidence);
                    SweetAlert.swal("Incidencia gardada", null, "success");
                })
                .catch(function (err) {
                    console.log(err);
                });
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
        var optionsTableIncidences = new Object;

        optionsTableIncidences.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');

        optionsTableIncidences.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3).notSortable()
        ];

        $scope.optionsTableIncidences = optionsTableIncidences;
    })();

    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };
    })();

}