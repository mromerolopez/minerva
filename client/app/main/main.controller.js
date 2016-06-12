'use strict';

app.controller('MainController', MainController);

function MainController($scope, $rootScope, auth, loansFactory) {

//    $scope.labelsd = ["Fondos Comprados", "Fondos Donados", "Outros Fondos"];
//    $scope.datad = [300, 500, 100];
//    $scope.colorsd = ['#4dff88', '#80ff80', '#00994d'];
//
//    $scope.labelsp = ["Fondos Comprados", "Fondos Donados", "Outros Fondos"];
//    $scope.datap = [200, 400, 350];
//    $scope.colorsp = ['#4dff88', '#80ff80', '#00994d'];
//
//    $scope.labelsLoans = ["Septembro", "Outubro", "Novembro", "Decembro", "Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño"];
//    $scope.seriesLoans = ['Profesores', 'Alumnos'];
//    $scope.colorsLoans = ['#2ED131', '#DF013A'];
//    $scope.dataLoans = [
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//
//    ];

    loansFactory.getLoans()
            .then(function (loans) {
                console.log(loans);
                for (var i = 0; i < loans.length; i++) {

                    var date = new Date(loans[i].created_at);
                    var month = date.getMonth();

                    if (loans[i].borrower.type === "Profesor") {
                        $scope.dataLoans[0][month + 4]++;
                    } else {
                        $scope.dataLoans[1][month + 4]++;

                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            });


    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };

    })();
}
