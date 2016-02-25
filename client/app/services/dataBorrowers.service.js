'user strict';

app.service('dataBorrowers', dataBorrowers);


function dataBorrowers($q, $http) {

    return {
        getBorrowers: getBorrowers // get a list of all the borrowers

    };


    function getBorrowers() {
        var defered = $q.defer();
        var promise = defered.promise;



        $http({
            method: 'GET',
            url: '/api/borrowers'
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }


}