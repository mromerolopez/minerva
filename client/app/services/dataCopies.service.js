'user strict';

app.service('dataCopies', dataCopies);

function dataCopies($q, $http){
    return {
        getCopies: getCopies,
        getCopy: getCopy
    };
    
    function getCopies(){
        
    }
    
    function getCopy(){
        
    }
}
