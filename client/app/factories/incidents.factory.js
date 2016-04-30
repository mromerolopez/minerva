'user strict';

app.factory('incidentsFactory', incidentsFactory);

function incidentsFactory($q, $http) {
    return {
        getIncidents: getIncidents,
        getIncident: getIncident,
        addIncident: addIncident,
        saveIncident: saveIncident
    };

    function getIncidents() {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '/api/incidents'
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function getIncident(id) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '/api/incidents/' + id
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function addIncident(incident) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'POST',
            url: '/api/incidents/',
            data: incident
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function saveIncident(incident) {
        var defered = $q.defer();
        var promise = defered.promise;


        $http({
            method: 'PUT',
            url: '/api/incidents/' + incident._id,
            data: incident
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }
}
