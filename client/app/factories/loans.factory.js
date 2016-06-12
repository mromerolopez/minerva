'user strict';

angular.module('minervaApp').factory('loansFactory', loansFactory);

function loansFactory($q, $http) {
    return {
        getLoans: getLoans,
        getLoan: getLoan,
        addLoan: addLoan,
        saveLoan: saveLoan,
        deleteLoan: deleteLoan
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

    function deleteLoan(loan) {
        var defered = $q.defer();
        var promise = defered.promise;
        loan.active = false;

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
}