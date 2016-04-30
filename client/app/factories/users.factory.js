'user strict';

app.factory('usersFactory', usersFactory);


function usersFactory($q, $http) {

    return {
        login: login,
        getUsers: getUsers, //lists all the users
        saveUser: saveUser, // updates an existing user
        addUser : addUser, // creates a new user
        lastLogins : lastLogins // gives a user list sorted by login date

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
    
    function getUsers(){
         var defered = $q.defer();
        var promise = defered.promise;

       

        $http({
            method: 'GET',
            url: '/api/users'
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

   function saveUser(user){
        var defered = $q.defer();
        var promise = defered.promise;


        $http({
            method: 'PUT',
            url: '/api/users/'+user._id,
            data: user
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function addUser(user) {
        var defered = $q.defer();
        var promise = defered.promise;


        $http({
            method: 'POST',
            url: '/api/users/',
            data: user
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }
    
       function lastLogins() {
        var defered = $q.defer();
        var promise = defered.promise;


        $http({
            method: 'GET',
            url: '/api/users/last/logins'
            
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }
    
}


