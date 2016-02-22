'use strict';

angular.module('minervaApp')
        .controller('XestionAccesosCtrl', XestionAccesosCtrl);

function XestionAccesosCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, dataUsers) {
    $scope.message = 'Hello';
    $scope.users=[];
    
     dataUsers.getUsers()
            .then(function (users) {
                $scope.users = users;
            })
            .catch(function (err) {
                console.log(err);
            });
    

    $scope.editarUsuario = function(user){
      console.log(user);  
    };

    (function () {
        var opcionesTablaUsuarios = new Object;

        opcionesTablaUsuarios.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Spanish.json');

        opcionesTablaUsuarios.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2).notSortable(),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4)
        ];
    })();



}



