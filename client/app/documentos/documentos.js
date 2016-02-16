'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('documentos', {
        url: '/documentos',
        templateUrl: 'app/documentos/documentos.html',
        controller: 'DocumentosCtrl'
      });
  });
