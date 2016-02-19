'user strict';

app.service('dataUsers', dataUsers);


function dataUsers($q, $http) {

    return {
        login: login

    };

    function login(user, pass) {
        var defered = $q.defer();
        var promise = defered.promise;

        var datos = new Object;
        datos.user = user;
        datos.pass = pass;


        $http({
            method: 'POST',
            url: '/api/users/login',
            data: datos
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;

    }




}


