'use strict';

angular.module('minervaApp')
        .controller('XestionBibliotecaCtrl', XestionBibliotecaCtrl);

function XestionBibliotecaCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, dataBooks, googleBooks, $rootScope, auth) {
    var user = auth.get_user();
    
    $scope.book = new Object;
    $scope.loan = new Object;
    $scope.books = [];
    $scope.editingBook = false;
    $scope.creatingLoan = false;
    
    // nuevo libro

    $scope.newBook = function () {
        $scope.book = new Object;
        $scope.book.created_at = new Date();
        $scope.book.image = "/assets/images/logo.png";
        $scope.editingBook = true;
    };

    $scope.editBook = function (book) {
        $scope.book = book;
        $scope.editingBook = true;
    };

    $scope.cancelEditingBook = function () {
        $scope.book = new Object;
        $scope.editingBook = false;
    };

    $scope.checkIsbn = function (isbn) {

        if (isbn !== "") {
            googleBooks.getBookISBN(isbn)
                    .then(function (datos) {
                        if (datos.totalItems > 0) {
                            var searchedBook = datos.items[0].volumeInfo;
                            $scope.book.title = searchedBook.title;
                            $scope.book.author = searchedBook.authors[0];
                            $scope.book.isbn10 = searchedBook.industryIdentifiers[0].identifier;
                            $scope.book.isbn13 = searchedBook.industryIdentifiers[1].identifier;
                            $scope.book.image = searchedBook.imageLinks.thumbnail;
                            $scope.book.synopsis = searchedBook.description;
                            $scope.book.language = searchedBook.language;
                            $scope.book.pages = searchedBook.pageCount;
                            $scope.book.editorial = searchedBook.publisher;
                            $scope.book.rating = searchedBook.averageRating;
                            //console.log(searchedBook);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
        } else {
            $scope.book = new Object;
            $scope.book.created_at = new Date();
            $scope.book.image = "/assets/images/logo.png";
        }

    };

    $scope.saveBook = function (book) {
        if (typeof book._id !== "undefined") {
            // edit
            dataBooks.saveBook(book)
                    .then(function (modifiedBook) {
                        $scope.editingBook = false;
                        $scope.book = new Object;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

        } else {
            // insert
            book.user = auth.get_user()._id;
            dataBooks.addBook(book)
                    .then(function (insertedBook) {
                        console.log(insertedBook);
                        $scope.books.push(insertedBook);
                        $scope.editingBook = false;
                        $scope.book = new Object;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
        }
    };
    // fin nuevo libro

    // population
    dataBooks.getBooks()
            .then(function (books) {
                $scope.books = books;
            })
            .catch(function (err) {
                console.log(err);
            });
    // fin population


    // nuevo préstamo
    $scope.newLoan = function (book) {
        
        var limit = new Date();
        limit.setDate(limit.getDate() + 7);
        
        $scope.loan = new Object;
        
        $scope.loan.date = new Date;
        $scope.loan.limit = limit;
        
        $scope.creatingLoan = true;
        $scope.book = book;
        
        
    };

    $scope.cancelNewLoan = function () {
        $scope.creatingLoan = false;
        $scope.book = new Object;
        $scope.loan = new Object;
    };

    // fin de nuevo préstamo

    // configuración

    (function () {
        var opcionesTablaLibros = new Object;

        opcionesTablaLibros.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');


        opcionesTablaLibros.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5).notSortable()
        ];

        $scope.opcionesTablaLibros = opcionesTablaLibros;
    })();

    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };
    })();

//    $scope.today = function () {
//        $scope.dt = new Date();
//    };
//    $scope.today();

//    $scope.clear = function () {
//        $scope.dt = null;
//    };

//    $scope.inlineOptions = {
//        customClass: getDayClass,
//        minDate: new Date(),
//        showWeeks: true
//    };
//
//    $scope.dateOptions = {
//        dateDisabled: disabled,
//        formatYear: 'yy',
//        maxDate: new Date(2020, 5, 22),
//        minDate: new Date(),
//        startingDay: 1
//    };

    // Disable weekend selection
//    function disabled(data) {
//        var date = data.date,
//                mode = data.mode;
//        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
//    }
//
//    $scope.toggleMin = function () {
//        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
//        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
//    };

//    $scope.toggleMin();
//
//    $scope.open1 = function () {
//        $scope.popup1.opened = true;
//    };
//
//    $scope.open2 = function () {
//        $scope.popup2.opened = true;
//    };
//
//    $scope.setDate = function (year, month, day) {
//        $scope.dt = new Date(year, month, day);
//    };

    //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    //$scope.format = $scope.formats[0];
    //$scope.altInputFormats = ['M!/d!/yyyy'];

//    $scope.popup1 = {
//        opened: false
//    };
//
//    $scope.popup2 = {
//        opened: false
//    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    var afterTomorrow = new Date();
    
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
                mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
}
