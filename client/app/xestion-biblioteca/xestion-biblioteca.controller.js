'use strict';

angular.module('minervaApp')
        .controller('XestionBibliotecaCtrl', XestionBibliotecaCtrl);

function XestionBibliotecaCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, dataBooks, googleBooks, $rootScope, auth, dataBorrowers, dataLoans, SweetAlert) {
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
                        SweetAlert.swal("Libro actualizado correctamente", null, "success");
                    })
                    .catch(function (err) {
                        SweetAlert.swal("Ocurriu un erro inesperado", null, "error");
                        console.log(err);
                    });

        } else {
            // insert
            book.user = user._id;
            dataBooks.addBook(book)
                    .then(function (insertedBook) {
                        //console.log(insertedBook);
                        $scope.books.push(insertedBook);
                        $scope.editingBook = false;
                        $scope.book = new Object;
                        SweetAlert.swal("Libro engadido correctamente", null, "success");

                    })
                    .catch(function (err) {
                        SweetAlert.swal("Ocurriu un erro inesperado", null, "error");
                        console.log(err);
                    });
        }
    };
    // fin nuevo libro

    // population
    (function () {
        dataBooks.getBooks()
                .then(function (books) {
                    $scope.books = books;
                })
                .catch(function (err) {
                    SweetAlert.swal("Ocurriu un erro inesperado", null, "error");
                    console.log(err);
                });
    })();
    // fin population


    // nuevo préstamo
    $scope.newLoan = function (book) {

        var limit = new Date();
        limit.setDate(limit.getDate() + 14);

        $scope.loan = new Object;

        $scope.loan.loan_date = new Date;
        $scope.loan.limit_date = limit;

        $scope.creatingLoan = true;
        $scope.book = book;


    };

    $scope.cancelNewLoan = function () {
        $scope.creatingLoan = false;
        $scope.book = new Object;
        $scope.loan = new Object;
    };

    // fin de nuevo préstamo

    // buscar borrower

    var searched_item = new Object;

    $scope.getBorrower = function (val) {
        if (!$scope.noResults) {
            $scope.borrower = new Object;
        }
        return dataBorrowers.getBorrowerTypeHead(val).then(function (response) {
            //console.log(response);
            return response.map(function (item) {
                searched_item = item;
                return item.name + " " + item.surname1 + " " + item.surname2 + " - " + item.nif;
            });
        }).catch(function (err) {
            console.log(err);
        });
    };

    $scope.selectBorrower = function () {
        $scope.borrower = searched_item;
        // console.log(searched_item);
    };

    $scope.resetBorrower = function (model) {
        if (model === '') {
            $scope.borrower = new Object;
        }
    };

    // fin buscar borrower 

    //save Loan

    $scope.saveLoan = function (loan) {

        loan.borrower = $scope.borrower._id;
        loan.book = $scope.book._id;
        loan.user = user._id;
        // console.log(loan);

        if (typeof loan.borrower !== 'undefined' && typeof loan.book !== 'undefined' && typeof loan.user !== 'undefined') {
            dataLoans.addLoan(loan).then(function (insertedLoan) {
                loan = new Object;
                $scope.creatingLoan = false;
                SweetAlert.swal("Préstamo engadido correctamente", null, "success");
            }).catch(function (err) {
                console.log(err);
                SweetAlert.swal("Ocurriu un erro inesperado", null, "error");
            });
        }

    };

    // fin save Loan

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
            DTColumnDefBuilder.newColumnDef(5).notSortable(),
            DTColumnDefBuilder.newColumnDef(6).notSortable()
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
}
