'user strict';

app.service('dataLoans', dataLoans);

function dataLoans($q, $http){
    return {
      getLoans: getLoans,
      getLoan: getLoan,
      addLoan: addLoan,
      saveLoan: saveLoan,
      deleteLoan: deleteLoan
    };
    
    function getLoans(){
        
    }
    
    function getLoan(){
        
        
    }   
    
    function addLoan(){
        
    }
    
    function saveLoan(){
        
    }
    
    function deleteLoan(){
        
    }
}