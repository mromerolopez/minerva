'user strict';

app.factory('booksFactory', booksFactory);

function booksFactory($q, $http) {

    return {
        getBooks: getBooks, // function that gets a list of books
        getBook: getBook, // (_id) gets the book
        addBook: addBook, // (book) inserts a book
        saveBook: saveBook, // (book) saves a book
        getBookTypeHead: getBookTypeHead //searches a book with TypeHead
    };

    function getBooks() {
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

    function getBook(id) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: '/api/books/' + id
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function addBook(book) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'POST',
            url: '/api/books/',
            data: book
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function saveBook(book) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'PUT',
            url: '/api/books/' + book._id,
            data: book
        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }

    function getBookTypeHead(value) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: 'api/books/get/filter/' + value

        }).success(function (datos) {
            defered.resolve(datos);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }
}