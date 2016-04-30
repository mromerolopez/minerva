'use strict';

angular.module('minervaApp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope, usersFactory, $location, auth, $log) {
    $rootScope.login = true;
    $scope.errorMessage = '';
    
    $scope.login = function () {

        var username = $scope.username;
        var password = $scope.password;

        usersFactory.login(username, password)
                .then(function (response) {

                    console.log(response);
                    if (response.success) {
                        loginSuccess(response.user);
                    } else {
                        loginFailed(response.message);
                    }

                })
                .catch(function (err) {
                    $log.error(err);
                });

    };

    function loginSuccess(user) {
        auth.login(user);
        $rootScope.login = false;
        $location.path('/');
    }
    
    function loginFailed(message) {
        $scope.errorMessage = message;
    }
}
