'use strict';

app.controller('MainController', MainController);

function MainController($scope, $rootScope, auth) {

    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };
        
        console.log($rootScope.user);
    })();

    $scope.labelsd = ["Fondos Comprados", "Fondos Donados", "Outros Fondos"];
    $scope.datad = [300, 500, 100];
    $scope.colorsd = ['#4dff88', '#80ff80','#00994d'];

    $scope.labelsp = ["Fondos Comprados", "Fondos Donados", "Outros Fondos"];
    $scope.datap = [200, 400, 350];
    $scope.colorsp = ['#4dff88', '#80ff80','#00994d'];

    $scope.labelsb = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Profesores', 'Alumnos'];
    $scope.colorsb = ['#003300', '#990000'];
    $scope.datab = [
        [65, 59, 80, 81, 56, 55, 40],
        [88, 18, 60, 39, 16, 77, 50]

    ];



}
