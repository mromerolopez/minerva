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
    'ngMaterial',
    'ja.qr',
    'ui.checkbox',
    'ui-notification',
    'ngCsv'
])
        .config(function ($urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
        })

        .constant('COOKIE', {USER: 'minerva_dev_user', TOKEN: 'minerva_dev_token'})

        .config(function (NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 4000
            });
        })

        .run(check);

function check($rootScope, auth, $timeout) {

    $timeout($rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                auth.checkStatus();
                var token = auth.getToken();
                if (token) {
                    auth.setDefaultAuthHeader(token);
                }
            }), 100);



}

