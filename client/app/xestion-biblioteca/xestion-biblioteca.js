'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('xestion-biblioteca', {
        url: '/xestion-biblioteca',
        templateUrl: 'app/xestion-biblioteca/xestion-biblioteca.html',
        controller: 'XestionBibliotecaCtrl'
      });
  });
