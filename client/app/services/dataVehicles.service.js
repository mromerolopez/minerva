'user strict';

app.service('dataVehicles', dataVehicles);

function dataVehicles($q, $http) {
    
    return{
        getVehiclesImei: getVehiclesImei, // (imeis) recibe por parámetro un array de imeis y devuelve los vehículos asociados actualmente a ese imei
        showVehicle: showVehicle, // (_id) recibe el id de un vehículo y lo devuelve
        saveVehicle: saveVehicle, // (coche) actualiza el vehículo introducido por parámetros
        saveVehiclePruebas: saveVehiclePruebas
    };

    function getVehiclesImei(imeis) {
        var defered = $q.defer();
        var promise = defered.promise;
        
        var datos = new Object;
        datos.imeis = imeis;

        $http({
            method: 'POST',
            url: '/api/vehicles/got/imeis',
            data: datos
        }).success(function (data) {
            defered.resolve(data);
        }).error(function (err) {
            defered.reject(err);
        });
        
        return promise;
    }
    
    function showVehicle(id){
        var defered = $q.defer();
        var promise = defered.promise;
        
        $http({
            method: 'GET',
            url: '/api/vehicles/' + id
        }).success(function (data){
          defered.resolve(data)  
        }).error(function(err){
            defered.reject(err);
        });
        return promise;
    }
    
    function saveVehicle(coche){
        
        var defered = $q.defer();
        var promise = defered.promise;
        
        $http({
            method: 'PUT',
            url: 'api/vehicles/' + coche._id,
            data: coche
        }).success(function (data){
          defered.resolve(data)  
        }).error(function(err){
           defered.reject(err);
        });
        return promise;
        
    }
    
    function saveVehiclePruebas(coche){
         var defered = $q.defer();
        var promise = defered.promise;
        
        $http({
            method: 'PUT',
            url: 'api/vehicles/update/pruebas/' + coche._id,
            data: coche
        }).success(function (data){
          defered.resolve(data)  
        }).error(function(err){
           defered.reject(err);
        });
        return promise;
    }
}