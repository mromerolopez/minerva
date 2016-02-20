'use strict';

angular.module('minervaApp')
        .controller('XestionBibliotecaCtrl', XestionBibliotecaCtrl);

function XestionBibliotecaCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, dataBooks, googleBooks) {
    $scope.message = 'Hello';
    $scope.book = new Object;
    $scope.books = [];
    
    $scope.checkIsbn = function (isbn) {

        if (isbn !== "") {
            googleBooks.getBookISBN(isbn).then(function (datos) {
                if (datos.totalItems > 0) {
                    var searchedBook = datos.items[0].volumeInfo;
                    $scope.book.title = searchedBook.title;
                    $scope.book.author = searchedBook.authors[0];
                    
                    console.log(searchedBook);
                }
            }).catch(function (err) {
                console.log(err);
            });
        } else {
            $scope.book = new Object;
        }
        
    };
    
    $scope.saveBook = function(book){
        console.log(book);
        $scope.book = new Object;
    };

    // var books = [];
    // $scope.books = books;

    dataBooks.getBooks()
            .then(function (libros) {
                $scope.books = libros;
            })
            .catch(function (err) {
                console.log(err);
            });

    (function () {
        var opcionesTablaLibros = new Object;

        opcionesTablaLibros.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Spanish.json');


        opcionesTablaLibros.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2).notSortable(),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4)

        ];

        $scope.opcionesTablaLibros = opcionesTablaLibros;
    })();
}
