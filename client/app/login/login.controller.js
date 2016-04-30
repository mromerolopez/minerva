'use strict';

angular.module('minervaApp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope, usersFactory, $location, auth, $log) {
    $rootScope.login = true;
    $scope.login = function () {

        var username = $scope.username;
        var password = $scope.password;

        usersFactory.login(username, password)
                .then(function (user) {
                    if (user !== null) {
                        auth.login(user);
                        $rootScope.login = false;
                        $location.path('/');
                    }

                })
                .catch(function (err) {
                    $log.error(err);
                });

    };
}
