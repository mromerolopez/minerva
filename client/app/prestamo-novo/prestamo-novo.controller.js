'use strict';

angular.module('minervaApp')
  .controller('PrestamoNovoCtrl', function ($scope, $rootScope, auth) {
    $scope.message = 'Hello';
    $rootScope.salir = function(){
        auth.logout();
    };
  });
