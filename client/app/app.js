'use strict';

var app = angular.module('minervaApp', [
  'minervaApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'datatables',
  'ngAnimate',
  'chart.js',
  'oitozero.ngSweetAlert'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
    .constant('cookieConfig', {name:'minerva_dev_user'})
//mientras corre la aplicación, comprobamos si el usuario tiene acceso a la ruta a la que está accediendo
    .run(check);

function check($rootScope, auth, $timeout) {

    //al cambiar de rutas
    //se establece un timeout de 100 milisegundos porque si coincide con alguna llamada asíncrona no se produce la comprobación
    //de la cookie
    $timeout($rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
                //la cuál hemos inyectado en la acción run de la aplicación
                auth.checkStatus();
            }), 100);
}    

