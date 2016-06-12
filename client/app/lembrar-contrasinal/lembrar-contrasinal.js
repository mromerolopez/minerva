'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lembrar-contrasinal', {
        url: '/lembrar-contrasinal',
        templateUrl: 'app/lembrar-contrasinal/lembrar-contrasinal.html',
        controller: 'LembrarContrasinalCtrl'
      });
  });
