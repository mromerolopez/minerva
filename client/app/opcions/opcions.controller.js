'use strict';

app.controller('OpcionsCtrl', function ($scope, $rootScope, auth) {

    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };
    })();
});
