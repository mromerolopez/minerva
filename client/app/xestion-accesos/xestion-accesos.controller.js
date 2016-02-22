'use strict';

angular.module('minervaApp')
        .controller('XestionAccesosCtrl', XestionAccesosCtrl);

function XestionAccesosCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, dataUsers) {
    $scope.user=new Object;
    $scope.users=[];
    
    
     dataUsers.getUsers()
            .then(function (users) {
                $scope.users = users;
            })
            .catch(function (err) {
                console.log(err);
            });
    

   $scope.saveUser=function(user){
       dataUsers.saveUser(user)
        .then(function(data){
        $scope.editingUser=false;
       }).catch(function(err){
           console.log(err);
       });
   };
   

    $scope.editUser = function(user){
        $scope.user=user;
        $scope.editingUser = true;
       
    };
    
      $scope.cancelEditingUser = function(){
        $scope.user = new Object;
        $scope.editingUser = false;
    };

    (function () {
        var opcionesTablaUsuarios = new Object;

        opcionesTablaUsuarios.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');

        opcionesTablaUsuarios.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2).notSortable(),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4)
        ];
        
        $scope.opcionesTablaUsuarios = opcionesTablaUsuarios;
    })();



}



