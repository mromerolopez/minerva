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
    'oitozero.ngSweetAlert',
    'chart.js',
    'ngMaterial'
])
        .config(function ($urlRouterProvider, $locationProvider) {
            $urlRouterProvider
                    .otherwise('/');

            $locationProvider.html5Mode(true);
        })
        .constant('COOKIE', {USER: 'minerva_dev_user'})
        .run(check);

function check($rootScope, auth, $timeout) {

    $timeout($rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                auth.checkStatus();
            }), 100);
}

