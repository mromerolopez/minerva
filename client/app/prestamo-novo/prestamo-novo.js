'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('prestamo-novo', {
        url: '/prestamo-novo',
        templateUrl: 'app/prestamo-novo/prestamo-novo.html',
        controller: 'PrestamoNovoCtrl'
      });
  });
