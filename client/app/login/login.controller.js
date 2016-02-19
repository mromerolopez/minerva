'use strict';

app.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope, dataUsers) {
    $rootScope.login = true;



    $scope.login = function () {

        var username = $scope.username;
        var password = $scope.password;
        
        console.log(username);
        dataUsers.login(username, password)
                .then(function (datos) {
                    console.log(datos);
                }).catch(function (err) {
            console.log(err);
        });

    }

}
