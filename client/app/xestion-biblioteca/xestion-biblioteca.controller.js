'use strict';

angular.module('minervaApp')
        .controller('XestionBibliotecaCtrl', XestionBibliotecaCtrl);

function XestionBibliotecaCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.message = 'Hello';

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


    var books = [];

    for (var i = 0; i < 1000; i++) {
        var book = new Object;
        book.id = "eli";
        books.push(book);
    }
    $scope.books = books;

    $scope.opcionesTablaLibros = opcionesTablaLibros;

}
