'user strict';

app.factory('mapsFactory', mapsFactory);

function mapsFactory($q, $http) {

    return {
        getLocations: getLocations// (string) function para obtener un listado de localizaciones
    };

    function getLocations(value) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '//maps.googleapis.com/maps/api/geocode/json',
            params: {
                address: value,
                sensor: false
            }
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;

    }
}
