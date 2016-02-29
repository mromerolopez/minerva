'use strict';

app.controller('MainController', MainController);

function MainController($scope, $rootScope, auth) {

    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };
    })();

    $scope.labelsd = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.datad = [300, 500, 100];

    $scope.labelsp = ["Downloads", " Sales", "Mail-Orders"];
    $scope.datap = [200, 400, 350];

    $scope.labelsl = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B', 'Series C'];
    $scope.datal = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
        [88, 18, 60, 39, 16, 77, 50]

    ];


    //console.log(auth.get_user());

}
