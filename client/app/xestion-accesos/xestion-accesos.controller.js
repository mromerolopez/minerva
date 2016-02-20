'use strict';

angular.module('minervaApp')
  .controller('XestionAccesosCtrl',XestionAccesosCtrl);

function XestionAccesosCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.message = 'Hello';

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


 
    }
    

    $scope.opcionesTablaUsuarios = opcionesTablaUsuarios;

}
