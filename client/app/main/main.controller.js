'use strict';

app.controller('MainController', MainController);

function MainController($scope, $http, googleBooks) {
    $scope.forms = "active";
    $scope.hola = "pepe";
//    dataVehicles.getVehiclesImei(['12421414']).then(function(datos){
//        var datos = datos;
//    }).catch(function(err){
//        console.log(err);
//    });
    $http.get('api/books').success(function (books) {
        $scope.books = books;
    });

    $scope.guardarLibro = guardaLibros;

    function guardaLibros() {
        $scope.insertando = true;
        var titulo = $scope.titulo;
        var autor = $scope.autor;

        var libro = {
            title: titulo,
            author: autor
        };
        console.log(libro);

        $http.post('api/books', libro).success(function (book) {
            console.log("Win");
            $scope.books.push(book);
            $scope.insertando = false;
        });
    };


    googleBooks.getBookISBN('8493987743')
            .then(function (book) {
                $scope.book = book;
            }).catch(function (err) {
        console.log(err);
    });

}
