'use strict';

app.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope, dataUsers, $location) {
    $rootScope.login = true;



    $scope.login = function () {

        var username = $scope.username;
        var password = $scope.password;

        dataUsers.login(username, password)
                .then(function (datos) {

                    console.log(datos);
                    if (datos !== null) {
                        $rootScope.login = false;
                        $location.path('/');
                    }
                    
                }).catch(function (err) {
            console.log(err);
        });

    };

}
