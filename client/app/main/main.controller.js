'use strict';

app.controller('MainController', MainController);

function MainController($scope, $rootScope, auth, loansFactory) {

    $scope.loans = [];
    $scope.loan=new Object;
    
    loansFactory.getLoans()
            .then(function (loans) {
                $scope.loans = loans;
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
