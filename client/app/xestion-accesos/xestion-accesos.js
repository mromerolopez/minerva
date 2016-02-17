'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('xestion-accesos', {
        url: '/xestion-accesos',
        templateUrl: 'app/xestion-accesos/xestion-accesos.html',
        controller: 'XestionAccesosCtrl'
      });
  });
