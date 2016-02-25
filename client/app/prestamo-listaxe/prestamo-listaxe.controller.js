'use strict';

angular.module('minervaApp')
  .controller('PrestamoListaxeCtrl', function ($scope, $rootScope, auth) {
    $scope.message = 'Hello';
    $rootScope.salir = function(){
        auth.logout();
    };
  });
