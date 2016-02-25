'use strict';

angular.module('minervaApp')
        .controller('XestionAccesosCtrl', XestionAccesosCtrl);

function XestionAccesosCtrl($scope, DTOptionsBuilder, $rootScope, DTColumnDefBuilder, dataUsers , auth) {
    $scope.user = new Object;
    $scope.users = [];
    $scope.last_logins = [];
    $rootScope.salir = function(){
        auth.logout();
    };

    dataUsers.getUsers()
            //get a list of all users
            .then(function (users) {
                $scope.users = users;
            })
            .catch(function (err) {
                console.log(err);
            });

    dataUsers.lastLogins()
            .then(function (users)
            {
                $scope.last_logins = users;
            })
            .catch(function (err) {
                console.log(err);
            });



    $scope.saveUser = function (user) {


        if (typeof user._id !== 'undefined') {
            //updates the actual user
            dataUsers.saveUser(user)
                    .then(function (modifiedUser) {
                        $scope.editingUser = false;
                    }).catch(function (err) {
                console.log(err);
            });
        } else {
            // create user
            dataUsers.addUser(user)
                    .then(function (newUser) {
                        $scope.editingUser = false;
                        $scope.users.push(newUser);
                    }).catch(function (err) {
                console.log(err);
            });
        }

    };


    $scope.editUser = function (user) {
        $scope.user = user;
        $scope.editingUser = true;

    };

    $scope.cancelEditingUser = function () {
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
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6),
            DTColumnDefBuilder.newColumnDef(7),
            DTColumnDefBuilder.newColumnDef(8).notSortable()
        ];

        $scope.opcionesTablaUsuarios = opcionesTablaUsuarios;
    })();



}



