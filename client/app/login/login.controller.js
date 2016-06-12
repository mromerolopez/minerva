'use strict';

angular.module('minervaApp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope, usersFactory, $location, auth, $log, Notification) {
    $rootScope.login = true;
    $scope.errorMessage = '';
    $scope.rememberMe = true;

    $scope.login = function () {

        var username = $scope.username;
        var password = $scope.password;

        usersFactory.login(username, password)
                .then(function (response) {

                    if (response.success) {
                        setCookieToken(response.token);
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
        auth.setUser(user, $scope.rememberMe);
        $rootScope.login = false;
        $location.path('/');
    }

    function loginFailed(message) {
        Notification.error({message: message});

        $scope.errorMessage = message;
    }

    function setCookieToken(token) {
        auth.setToken(token, $scope.rememberMe);
    }


}
