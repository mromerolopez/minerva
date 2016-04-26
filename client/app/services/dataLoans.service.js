'user strict';

angular.module('minervaApp').factory('dataLoans', dataLoans);

function dataLoans($q, $http) {
    return {
        getLoans: getLoans, // obtiene todos los préstamos
        getLoan: getLoan, // (id) obtiene un préstamo concreto
        addLoan: addLoan, // (loan) añade un préstamo a la base de datos
        saveLoan: saveLoan, // (loan) actualiza un préstamo de la base de datos
        deleteLoan: deleteLoan // (loan) desactiva una loan de la base de datos
    };

    function getLoans() {

        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '/api/loans'
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function getLoan(id) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '/api/loans/' + id
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;

    }

    function addLoan(loan) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'POST',
            url: '/api/loans',
            data: loan
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function saveLoan(loan) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'PUT',
            url: '/api/loans/' + loan._id,
            data: loan
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function deleteLoan() {

    }
}