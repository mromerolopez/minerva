'use strict';

app.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope, dataUsers, $location, auth) {
    $rootScope.login = true;



    $scope.login = function () {

        var username = $scope.username;
        var password = $scope.password;

        dataUsers.login(username, password)
                .then(function (user) {
                   console.log(user);
                    if (user !== null) {
                        auth.login(user);
                        $rootScope.login = false;
                        $location.path('/');
                    }
                    
                }).catch(function (err) {
            console.log(err);
        });

    };

}
