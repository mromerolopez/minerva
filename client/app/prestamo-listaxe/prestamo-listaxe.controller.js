'use strict';

angular.module('minervaApp').controller('PrestamoListaxeCtrl', PrestamoListaxeCtrl);

function PrestamoListaxeCtrl($scope, $rootScope, auth, DTOptionsBuilder, DTColumnDefBuilder, loansFactory, incidentsFactory, SweetAlert, configurationFactory) {
    $scope.loans = [];
    $scope.loan = new Object;
    $scope.editingLoan = false;
    $scope.incidences = [];
    $scope.incidence = new Object;
    $scope.extendingLoan = false;
    $scope.incidents = [];

    var user = auth.get_user();

    configurationFactory.getConfiguration(user._id)
            .then(function (config) {
                $scope.incidents = config.incident_types;
            }).catch(function (err) {
        console.log(err);
    });


    $scope.newLoan = function () {
        $scope.loan = new Object;
    };

    loansFactory.getLoans()
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
        for (var i = 0; i < loan.incidents.length; i++) {
            if (loan.incidents[i].active) {
                $scope.incidences.push(loan.incidents[i]);
            }
        }
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

        if (typeof incidence._id === 'undefined') {
            console.log("insert");
            // insert
            incidentsFactory.addIncident(incidence)
                    .then(function (incidence) {
                        $scope.incidences.push(incidence);
                        SweetAlert.swal("Incidencia gardada", null, "success");
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
        } else {
            console.log("update");
            // update
            incidentsFactory.saveIncident(incidence)
                    .then(function (incidence) {
                        SweetAlert.swal("Incidencia gardada", null, "success");
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
        }

    };

    $scope.editIncidence = function (incidence) {
        $scope.incidence = incidence;
    };

    $scope.returnLoan = function () {
        SweetAlert.swal({
            title: "¿Está seguro de que quere recoller este préstamo?",
            text: "Unha vez recollido non se poderá revertir o seu estado.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00A65A",
            confirmButtonText: "Si, devólveo",
            cancelButtonText: "Non, cancela esta acción por favor",
            closeOnConfirm: false,
            closeOnCancel: false
        },
                function (isConfirm) {
                    if (isConfirm) {

                        $scope.loan.returned = !$scope.loan.returned;
                        loansFactory.saveLoan($scope.loan).then(function (loan) {
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
        loansFactory.saveLoan($scope.loan).then(function (loan) {
            SweetAlert.swal("¡Préstamo ampliado!", "Este préstamo foi gardado correctamente.", "success");
        }).catch(function (err) {
            SweetAlert.swal("Ocurriu un erro inesperado :(", null, "error");
            console.log(err);
        });
        $scope.extendingLoan = false;
    };

    $scope.deleteIncidence = function (index) {

        var incidence = $scope.incidences[index];
        incidence.active = false;
        incidence.updated_at = new Date();
        SweetAlert.swal({
            title: "¿Está seguro de que quere eliminar esta incidencia?",
            text: "Unha vez eliminada non se poderá revertir o seu estado.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00A65A",
            confirmButtonText: "Si, elimínaa",
            cancelButtonText: "Non, cancela esta acción por favor",
            closeOnConfirm: false,
            closeOnCancel: false
        },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.incidences.splice(index, 1);
                        SweetAlert.swal("¡Eliminado!", "Esta incidencia foi eliminada.", "success");
                        incidentsFactory.saveIncident(incidence).then(function (incident) {
                            
                            SweetAlert.swal("¡Eliminado!", "Esta incidencia foi eliminada.", "success");
                        }).catch(function (err) {
                            SweetAlert.swal("Ocurriu un erro inesperado :(", null, "error");

                            console.log(err);
                        });
                    } else {
                        SweetAlert.swal("¡Cancelado!", "Esta incidencia segue vixente :)", "error");
                    }
                });
    };

    (function () {
        var optionsTableLoans = new Object;

        optionsTableLoans.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('/assets/datatables/translations/galician.json');

        optionsTableLoans.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(9).notSortable()
        ];

        $scope.optionsTableLoans = optionsTableLoans;
    })();


    (function () {
        var optionsTableIncidences = new Object;

        optionsTableIncidences.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('/assets/datatables/translations/galician.json');

        optionsTableIncidences.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3).notSortable(),
            DTColumnDefBuilder.newColumnDef(4).notSortable()

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