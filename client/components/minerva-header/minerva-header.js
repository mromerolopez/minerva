'use strict';

app.directive('minervaHeader', function ($rootScope, $timeout) {

    return {
        restrict: 'E',
        templateUrl: 'components/minerva-header/minerva-header.html',
        scope: {
            user: '=',
            salir: '='
        },
        link: function (scope, elem, attrs) {

            $rootScope.toggled = false;

            scope.switchToggle = function () {
                $rootScope.toggled = !$rootScope.toggled;
            };
        }
    };
});