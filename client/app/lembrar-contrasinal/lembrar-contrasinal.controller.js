'use strict';

app.controller('LembrarContrasinalCtrl', function ($scope, $rootScope, $q, usersFactory, Notification) {
    $rootScope.login = true;


    $scope.sendNewPassword = function (email) {
        console.log(email);
        checkEmail(email)
                .then(function (result) {
                    if (result) {
                        rememberPassword(result._id).then().catch();
                        Notification.success({message: 'Un email enviouse a ' + email + ' cunha nova contrasinal'});
                    } else {
                        Notification.error({message: 'Iste email non está rexistrado'});
                    }
                })
                .catch(function (err) {
                    if (err) {
                        throw err;
                    }
                });
    };


    function checkEmail(email) {

        var defered = $q.defer();

        usersFactory.checkEmail(email)
                .then(function (user) {
                    defered.resolve(user);
                })
                .catch(function (err) {
                    defered.reject(err);
                });

        return defered.promise;
    }

    function rememberPassword(email) {

        var defered = $q.defer();

        usersFactory.rememberPassword(email)
                .then(function (result) {
                    defered.resolve(result);
                })
                .catch(function (err) {
                    defered.reject(err);
                });
        return defered.promise;
    }
});
