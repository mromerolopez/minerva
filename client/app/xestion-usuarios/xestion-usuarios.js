'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('xestion-usuarios', {
        url: '/xestion-usuarios',
        templateUrl: 'app/xestion-usuarios/xestion-usuarios.html',
        controller: 'XestionUsuariosCtrl'
      });
  });
