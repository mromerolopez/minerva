'use strict';

app.service('dataConfiguration', dataConfiguration);

function dataConfiguration($q, $http) {
    
    return {
        getConfiguration: getConfiguration
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



}

