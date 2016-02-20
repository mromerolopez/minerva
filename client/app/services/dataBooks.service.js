'user strict';

app.service('dataBooks', dataBooks);

function dataBooks($q, $http){
    return {
        getBooks: getBooks,
        getBook: getBook
    };
    
    function getBooks(){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '/api/books/'
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }
    
    function getBook(id){
         var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '/api/books/'+id
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }
}
