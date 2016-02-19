'user strict';

app.service('googleBooks', googleBooks);

function googleBooks($q, $http){
    return {
      getBookISBN: getBook  
    };
    
    function getBook(isbn){
               
        var defered = $q.defer();
        var promise = defered.promise;
        
        var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
        
        $http({
            method: 'GET',
            url: url
        }).success(function(book){
            defered.resolve(book);
        }).error(function(err){
            defered.reject(err);
        });
        
        return promise;
    }
}