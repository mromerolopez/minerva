'use strict';

app.controller('BookDetailCtrl', BookDetailCtrl);

function BookDetailCtrl($scope, $stateParams, booksFactory, $q, $log, $location) {
    var id = $stateParams.id;

    angular.extend($scope, {
        book: {}
    });

    getBook(id)
            .then(function (book) {
                $scope.book = book;
//                console.log(book);
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

    $scope.qrString = $location.absUrl();
}
