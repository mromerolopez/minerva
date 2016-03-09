'user strict';

app.service('dataBorrowers', dataBorrowers);


function dataBorrowers($q, $http) {

    return {
        getBorrowers: getBorrowers, // get a list of all the borrowers
        getBorrower: getBorrower,
        saveBorrower: saveBorrower, // updates a borrower
        addBorrower: addBorrower, // creates a new borrower
        getBorrowerTypeHead: getBorrowerTypeHead // searches a borrower with TypeHead
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
    
    function getBorrower(id) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '/api/borrowers/'+id
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function saveBorrower(borrower) {
        var defered = $q.defer();
        var promise = defered.promise;


        $http({
            method: 'PUT',
            url: '/api/borrowers/' + borrower._id,
            data: borrower
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function addBorrower(borrower) {
        var defered = $q.defer();
        var promise = defered.promise;


        $http({
            method: 'POST',
            url: '/api/borrowers/',
            data: borrower
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function getBorrowerTypeHead(value) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: 'api/borrowers/get/filter/' + value

        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }
}