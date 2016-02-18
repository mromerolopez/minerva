'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('opcions', {
        url: '/opcions',
        templateUrl: 'app/opcions/opcions.html',
        controller: 'OpcionsCtrl'
      });
  });
