'use strict';

app.directive('minervaSidebar', function () {

    return {
        restrict: 'E',
        templateUrl: 'components/minerva-sidebar/minerva-sidebar.html',
        scope: {
            salir: '='
        },
        link: function (scope, elem, attrs) {
            
            
        }
    };
});