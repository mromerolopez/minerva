'use strict';

angular.module('minervaApp')
  .controller('PrestamoListaxeCtrl', function ($scope, $rootScope, auth, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.loans = [];
    $scope.loan = new Object;
    
    $rootScope.salir = function(){
        auth.logout();
    };
    
    
    $scope.newLoan = function(){
      $scope.loan = new Object;
    };
    
     (function () {
        var optionsTableLoans = new Object;

        optionsTableLoans.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');

        optionsTableLoans.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6),
            DTColumnDefBuilder.newColumnDef(7),
            DTColumnDefBuilder.newColumnDef(8).notSortable()
        ];

        $scope.optionsTableLoans = optionsTableLoans;
    })();
    
  });
