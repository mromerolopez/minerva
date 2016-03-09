'use strict';

app.controller('XestionAccesosCtrl', XestionAccesosCtrl);

function XestionAccesosCtrl($scope, DTOptionsBuilder, $rootScope, DTColumnDefBuilder, dataUsers, auth, dataMaps, SweetAlert) {
    $scope.user = new Object;
    $scope.users = [];
    $scope.last_logins = [];

    dataUsers.getUsers()
            //get a list of all users
            .then(function (users) {
                $scope.users = users;
            })
            .catch(function (err) {
                console.log(err);
                SweetAlert.swal("Ocurriu un erro inesperado", null, "error");
            });

    dataUsers.lastLogins()
            .then(function (users)
            {
                $scope.last_logins = users;
            })
            .catch(function (err) {
                console.log(err);
                SweetAlert.swal("Ocurriu un erro inesperado", null, "error");
            });



    $scope.saveUser = function (user) {


        if (typeof user._id !== 'undefined') {
            //updates the actual user
            dataUsers.saveUser(user)
                    .then(function (modifiedUser) {
                        $scope.editingUser = false;
                        SweetAlert.swal("Usuario modificado correctamente", null, "success");

                    })
                    .catch(function (err) {
                        console.log(err);
                        SweetAlert.swal("Ocurriu un erro inesperado", null, "error");
                    });
        } else {
            // create user
            user.parent = auth.get_user()._id;
            dataUsers.addUser(user)
                    .then(function (newUser) {
                        $scope.editingUser = false;
                        $scope.users.push(newUser);
                        SweetAlert.swal("Usuario engadido correctamente", null, "success");
                    })
                    .catch(function (err) {
                        console.log(err);
                        SweetAlert.swal("Ocurriu un erro inesperado", null, "error");

                    });
        }

    };


    $scope.editUser = function (user) {
        $scope.user = user;
        $scope.editingUser = true;
        if (typeof user === 'undefined') {
            $scope.user = new Object;
            $scope.user.active = true;
        }

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

    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };
    })();

    $scope.getLocation = function (value) {
        return dataMaps.getLocations(value).then(function (response) {
            return response.results.map(function (item) {
                return item.formatted_address;
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
}



