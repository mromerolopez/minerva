'user strict';

app.factory('googleBooksFactory', googleBooksFactory);

function googleBooksFactory($q, $http) {
    return {
        getBookISBN: getBook
    };

    function getBook(isbn) {

        var defered = $q.defer();
        var promise = defered.promise;

        var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;

        $http({
            method: 'GET',
            url: url,
            headers: {'authorization': undefined}
        }).success(function (book) {
            defered.resolve(book);
        }).error(function (err) {
            defered.reject(err);
        });

        return promise;
    }
}