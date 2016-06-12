'use strict';

app.controller('BookDetailCtrl', BookDetailCtrl);

function BookDetailCtrl($scope, $stateParams, booksFactory, $q, $log, $location, DTColumnDefBuilder, DTOptionsBuilder, $rootScope, auth) {

    var id = $stateParams.id;
    $scope.qrString = $location.absUrl();

    angular.extend($scope, {
        book: {}
    });

    getBook(id)
            .then(function (book) {
                $scope.book = book;
            })
            .catch(function (err) {
                if (err) {
                    throw err;
                }
            });


    function getBook(id) {
        var defered = $q.defer();
        booksFactory.getBook(id)
                .then(function (book) {
                    defered.resolve(book);
                })
                .catch(function (err) {
                    defered.reject(err);
                });
        return defered.promise;
    }


    (function () {
        var optionsTableLoans = new Object;

        optionsTableLoans.dtOptions = DTOptionsBuilder
                .newOptions()
                .withLanguageSource('/assets/datatables/translations/galician.json');

        optionsTableLoans.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(5).notSortable()
        ];

        $scope.optionsTableLoans = optionsTableLoans;
    })();

    (function () {
        var optionsTableIncidences = new Object;

        optionsTableIncidences.dtOptions = DTOptionsBuilder
                .newOptions()
                .withLanguageSource('/assets/datatables/translations/galician.json');



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
