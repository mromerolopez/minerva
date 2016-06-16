'use strict';

app.controller('MainController', MainController);

function MainController($scope, $rootScope, auth, loansFactory, incidentsFactory, $log, booksFactory) {

    $scope.loans = [];
    $scope.incidents = [];
    $scope.books = [];
    $scope.loan = {};

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

    incidentsFactory.getIncidents()
            .then(function (incidents) {
                $scope.incidents = incidents;
            })
            .catch(function (err) {
                if (err) {
                    $log.error(err);
                }
            });

    booksFactory.getBooks()
            .then(function (books) {
                $scope.books = books;
            })
            .catch(function (err) {
                if (err) {
                    $log.error(err);
                }
            });
}
