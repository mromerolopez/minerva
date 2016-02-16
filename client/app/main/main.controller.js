'use strict';

app.controller('MainController', MainController);

function MainController($scope, $http) {
    $scope.hola = "pepe";
    
    $http.get('api/books').success(function(books){
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
        
        $http.post('api/books', libro).success(function(book){
            console.log("Win");
            $scope.books.push(book);
            $scope.insertando = false;
        });
    };

}
