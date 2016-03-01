'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tests', {
        url: '/tests',
        templateUrl: 'app/tests/tests.html',
        controller: 'TestsCtrl'
      });
  });
