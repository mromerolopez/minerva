(function(angular, undefined) {
'use strict';

angular.module('minervaApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']})
.constant('cookieConfig', {name:'minerva_dev_user'})
;
})(angular);