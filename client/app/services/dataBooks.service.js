'user strict';

app.service('dataBooks', dataBooks);

function dataBooks($q, $http){
    return {
        getBooks: getBooks, // function para obtener un listado de libros
        getBook: getBook, // (_id) obtiene el libro
        addBook: addBook, // inserta libro
        saveBook: saveBook // guarda libro
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
    
    function addBook(book){
        var defered = $q.defer();
        var promise = defered.promise;
        
        $http({
            method:'POST',
            url:'/api/books/',
            data: book
        }).success(function(datos){
            defered.resolve(datos);
        }).error(function(err){
            defered.reject(err);
        });
        
        return promise;
    }
    
    function saveBook(book){
        var defered = $q.defer();
        var promise = defered.promise;
        
        $http({
            method:'PUT',
            url:'/api/books/'+book._id,
            data: book
        }).success(function(datos){
            defered.resolve(datos);
        }).error(function(err){
            defered.reject(err);
        });
        
        return promise;
    }
}
