'use strict';

app.service('dataConfiguration', dataConfiguration );

function dataConfiguration($q,$http){
    return {
        getConfiguration : getConfiguration,
        addLocation : addLocation,
        saveLocation : saveLocation
  
    };
    
    function getConfiguration(userId){
        var defered=$q.defer();
        var promise=defered.promise;
        
        $http({
            method: 'GET',
            url: '/api/configurations/get/user/'+userId
        }).success(function(data){
            defered.resolve(data);
        }).error(function(err){
            defered.reject(err);
        });
        return promise;
    }
    
    function addLocation(location){
        var defered=$q.defer();
        var promise=defered.promise;
        
       $http({
            method: 'POST',
            url: '/api/configurations/'
            
        }).success(function(data){
            defered.resolve(data);
        }).error(function(err){
            defered.reject(err);
        });
        return promise;
        
    }
    
    function saveLocation(location){
        var defered=$q.defer();
        var promise=defered.promise;
        
       $http({
            method: 'PUT',
            url: '/api/configurations/'+location
        }).success(function(data){
            defered.resolve(data);
        }).error(function(err){
            defered.reject(err);
        });
        return promise;
        
    }
    
}

