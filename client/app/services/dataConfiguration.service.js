'use strict';

angular.module('minervaApp').factory('dataConfiguration', dataConfiguration);

function dataConfiguration($q, $http) {
    
    return {
        getConfiguration: getConfiguration,
        updateConfiguration: updateConfiguration
    };

    function getConfiguration(userId) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '/api/configurations/get/user/' + userId
        }).success(function (data) {
            defered.resolve(data);
        }).error(function (err) {
            defered.reject(err);
        });
        return promise;
    }
    
    function updateConfiguration(config){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'PUT',
            url: '/api/configurations/' + config._id,
            data: config
        }).success(function (data) {
            defered.resolve(data);
        }).error(function (err) {
            defered.reject(err);
        });
        return promise;
    }
}

