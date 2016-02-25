'use strict';

angular.module('minervaApp')
  .controller('XestionUsuariosCtrl', function ($scope, $rootScope, auth) {
    $scope.message = 'Hello';
    $rootScope.salir = function(){
        auth.logout();
    };
  });
