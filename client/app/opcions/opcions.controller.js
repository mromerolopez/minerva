'use strict';

angular.module('minervaApp')
  .controller('OpcionsCtrl', function ($scope, $rootScope, auth) {
    $scope.message = 'Hello';
    
    $rootScope.salir = function(){
        auth.logout();
    };
  });
