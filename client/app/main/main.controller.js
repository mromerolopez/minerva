'use strict';

app.controller('MainController', MainController);

function MainController($scope, $http) {
    $scope.hola = "pepe";

    $scope.guardarLibro = guardaLibros;

    function guardaLibros() {
        var titulo = $scope.titulo;
        var autor = $scope.autor;

        var libro = {
            title: titulo,
            author: autor
        };
        console.log(libro);
        
        $http.post('api/books', libro).success(function(){
            console.log("Win");
        });
    };

}
