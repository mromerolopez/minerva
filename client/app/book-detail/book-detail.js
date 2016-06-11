'use strict';

angular.module('minervaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('book-detail', {
        url: '/xestion-biblioteca/:id',
        templateUrl: 'app/book-detail/book-detail.html',
        controller: 'BookDetailCtrl'
      });
  });
