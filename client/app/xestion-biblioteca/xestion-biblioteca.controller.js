'use strict';

angular.module('minervaApp')
        .controller('XestionBibliotecaCtrl', XestionBibliotecaCtrl);

function XestionBibliotecaCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, dataBooks, googleBooks, $rootScope, auth) {
    $scope.book = new Object;
    $scope.books = [];
    $scope.editingBook = false;
    $rootScope.salir = function(){
        auth.logout();
    };

    $scope.newBook = function () {
        $scope.book = new Object;
        $scope.book.created_at = new Date();
        $scope.book.image = "/assets/images/logo.png";
        $scope.editingBook = true;

    };

    $scope.editBook = function (book) {
        $scope.book = book;
        $scope.editingBook = true;
    };

    $scope.cancelEditingBook = function () {
        $scope.book = new Object;
        $scope.editingBook = false;
    };

    $scope.checkIsbn = function (isbn) {

        if (isbn !== "") {
            googleBooks.getBookISBN(isbn)
                    .then(function (datos) {
                        if (datos.totalItems > 0) {
                            var searchedBook = datos.items[0].volumeInfo;
                            $scope.book.title = searchedBook.title;
                            $scope.book.author = searchedBook.authors[0];
                            $scope.book.isbn10 = searchedBook.industryIdentifiers[0].identifier;
                            $scope.book.isbn13 = searchedBook.industryIdentifiers[1].identifier;
                            $scope.book.image = searchedBook.imageLinks.thumbnail;
                            $scope.book.synopsis = searchedBook.description;
                            $scope.book.language = searchedBook.language;
                            $scope.book.pages = searchedBook.pageCount;
                            $scope.book.editorial = searchedBook.publisher;
                            $scope.book.rating = searchedBook.averageRating;
                            //console.log(searchedBook);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
        } else {
            $scope.book = new Object;
            $scope.book.created_at = new Date();
            $scope.book.image = "/assets/images/logo.png";
        }

    };


    $scope.saveBook = function (book) {
        if (typeof book._id !== "undefined") {
            // edit
            dataBooks.saveBook(book)
                    .then(function (modifiedBook) {

                        $scope.editingBook = false;
                        $scope.book = new Object;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

        } else {
            // insert
            book.user = auth.get_user()._id;
            dataBooks.addBook(book)
                    .then(function (insertedBook) {
                        console.log(insertedBook);
                        $scope.books.push(insertedBook);
                        $scope.editingBook = false;
                        $scope.book = new Object;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
        }

    };

    dataBooks.getBooks()
            .then(function (books) {
                $scope.books = books;
            })
            .catch(function (err) {
                console.log(err);
            });

    (function () {
        var opcionesTablaLibros = new Object;

        opcionesTablaLibros.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');


        opcionesTablaLibros.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5).notSortable()

        ];

        $scope.opcionesTablaLibros = opcionesTablaLibros;
    })();
}
