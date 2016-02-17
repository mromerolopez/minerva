'use strict';

angular.module('minervaApp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav',
    scope: {
      forms: '=info'
    }
  }));
