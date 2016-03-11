'use strict';

app.controller('PrestamoListaxeCtrl', PrestamoListaxeCtrl);

function PrestamoListaxeCtrl($scope, $rootScope, auth, DTOptionsBuilder, DTColumnDefBuilder, dataLoans, dataIncidents, SweetAlert) {
    $scope.loans = [];
    $scope.loan = new Object;
    $scope.editingLoan = false;
    $scope.incidences = [];
    $scope.incidence = new Object;
    $scope.extendingLoan = false;

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
        $scope.incidences = loan.incidents;
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

    $scope.returnLoan = function () {
        SweetAlert.swal({
            title: "¿Está seguro de que quere recoller este préstamo?",
            text: "Unha vez recollido non se poderá revertir o seu estado.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00A65A",
            confirmButtonText: "Si, devólveo",
            cancelButtonText: "Non, cancela está acción por favor",
            closeOnConfirm: false,
            closeOnCancel: false},
                function (isConfirm) {
                    if (isConfirm) {

                        $scope.loan.returned = !$scope.loan.returned;
                        dataLoans.saveLoan($scope.loan).then(function (loan) {
                            SweetAlert.swal("¡Recollido!", "Este préstamo foi recollido.", "success");
                        }).catch(function (err) {
                            SweetAlert.swal("Ocurriu un erro inesperado :(", null, "error");

                            console.log(err);
                        });
                    } else {
                        SweetAlert.swal("¡Cancelado!", "Este préstamo segue vixente :)", "error");
                    }
                });
    };

    $scope.extendLoan = function () {
        $scope.extendingLoan = true;

    };

    $scope.saveExtendingLoan = function () {
        dataLoans.saveLoan($scope.loan).then(function (loan) {
            SweetAlert.swal("¡Préstamo ampliado!", "Este préstamo foi gardado correctamente.", "success");
        }).catch(function (err) {
            SweetAlert.swal("Ocurriu un erro inesperado :(", null, "error");
            console.log(err);
        });
        $scope.extendingLoan = false;
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