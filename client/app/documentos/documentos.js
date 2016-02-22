'use strict';

app.config(function ($stateProvider) {
    $stateProvider
      .state('documentos', {
        url: '/documentos',
        templateUrl: 'app/documentos/documentos.html',
        controller: 'DocumentosCtrl'
      });
  });
