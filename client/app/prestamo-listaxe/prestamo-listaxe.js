'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('prestamo-listaxe', {
        url: '/prestamo-listaxe',
        templateUrl: 'app/prestamo-listaxe/prestamo-listaxe.html',
        controller: 'PrestamoListaxeCtrl'
      });
  });
