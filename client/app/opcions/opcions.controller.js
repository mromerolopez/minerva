'use strict';

app.controller('OpcionsCtrl', OpcionsCtrl);

function OpcionsCtrl($scope, $rootScope, auth, DTOptionsBuilder, DTColumnDefBuilder, dataConfiguration, SweetAlert) {

    $scope.location = new Object;
    $scope.locations = [];
    $scope.incidents = [];
    $scope.incident = new Object;
    $scope.books = [];
    $scope.book = new Object;
    $scope.borrowers = [];
    $scope.borrower = new Object;
    $scope.configuration = new Object;
    $scope.creatingLocation = false;
    $scope.editingLocation = false;
    $scope.type = "days";
    $scope.minDate = new Date();
    $scope.oneAtATime = true;
    $scope.isFirstOpen = true;

    var user = auth.get_user();

    dataConfiguration.getConfiguration(user._id)
            //get the configuration of a specific user
            .then(function (configuration) {
                $scope.configuration = configuration;
                $scope.incidents = configuration.incident_types;
                $scope.locations = configuration.locations;
                $scope.books = configuration.book_type;
                $scope.borrowers = configuration.borrower_types;
            })
            .catch(function (err) {
                console.log(err);
            });


//  ----- Start of location functions ------

    $scope.saveLocation = function (index) {

        $scope.location = $scope.locations[index];
        $scope.locations[index] = $scope.location;
        //$scope.locations.push(location);
        $scope.editingLocation = false;

        saveConfig();
    };


    $scope.newLocation = function () {
        $scope.location = new Object;
        $scope.editingLocation = false;
        $scope.creatingLocation = true;
    };

    $scope.saveNewLocation = function (location) {
        $scope.locations.push(location);
        $scope.location = new Object;
        $scope.creatingLocation = false;

        saveConfig();
    };

    $scope.editLocation = function (index) {
        $scope.location = $scope.locations[index];
        $scope.editingLocation = true;

    };

    $scope.deleteLocation = function (index) {
        $scope.locations.splice(index, 1);
        saveConfig();

    };

    $scope.cancelLocation = function () {
        $scope.location = new Object;
        $scope.editingLocation = false;
        $scope.creatingLocation = false;

    };

// ----- End of locations functions ------


//  ----- Start of incidents functions ------


    $scope.saveIncident = function (index) {

        $scope.incident = $scope.incidents[index];
        $scope.incidents[index] = $scope.incident;
        $scope.editingIncident = false;

        saveConfig();
    };


    $scope.newIncident = function () {
        $scope.incident = new Object;
        $scope.editingIncident = false;
        $scope.creatingIncident = true;
    };

    $scope.saveNewIncident = function (borrower) {
        $scope.incidents.push(borrower);
        $scope.incident = new Object;
        $scope.creatingIncident = false;

        saveConfig();
    };

    $scope.editIncident = function (index) {
        $scope.incident = $scope.incidents[index];
        $scope.editingIncident = true;

    };

    $scope.deleteIncident = function (index) {
        $scope.incidents.splice(index, 1);
        saveConfig();

    };

    $scope.cancelIncident = function () {
        $scope.incident = new Object;
        $scope.editingIncident = false;
        $scope.creatingIncident = false;

    };

// ----- End of incidents functions ------


//  ----- Start of borrower functions ------

    $scope.saveBorrower = function (borrower) {

        if ($scope.showDatepicker) {
            delete $scope.borrower.time;
        } else {
            delete $scope.borrower.date;
        }

        $scope.borrower = borrower;
        $scope.editingBorrower = false;

        saveConfig();
    };


    $scope.newBorrower = function () {
        $scope.borrower = new Object;
        $scope.editingBorrower = false;
        $scope.creatingBorrower = true;
    };

    $scope.saveNewBorrower = function (borrower) {
        $scope.borrowers.push(borrower);
        $scope.borrower = new Object;
        $scope.creatingBorrower = false;
        saveConfig();
    };

    $scope.editBorrower = function (index) {
        $scope.borrower = $scope.borrowers[index];
        $scope.editingBorrower = true;


    };

    $scope.deleteBorrower = function (index) {
        $scope.borrowers.splice(index, 1);
        saveConfig();

    };

    $scope.cancelBorrower = function () {
        $scope.borrower = new Object;
        $scope.editingBorrower = false;
        $scope.creatingBorrower = false;

    };

    $scope.checkTypes = function (tipo) {

        if (tipo === "days") {
            $scope.showDatepicker = false;
        } else {
            $scope.showDatepicker = true;

        }
    };

// ----- End of borrower functions ------




//  ----- Start of books functions ------

    $scope.saveBook = function (index) {

        $scope.book = $scope.books[index];
        $scope.books[index] = $scope.book;
        //$scope.locations.push(location);
        $scope.editingBook = false;

        saveConfig();
    };


    $scope.newBook = function () {
        $scope.book = new Object;
        $scope.editingBook = false;
        $scope.creatingBook = true;
    };

    $scope.saveNewBook = function (borrower) {
        $scope.books.push(borrower);
        $scope.book = new Object;
        $scope.creatingBook = false;

        saveConfig();

    };

    $scope.editBook = function (index) {
        $scope.book = $scope.books[index];
        $scope.editingBook = true;

    };

    $scope.deleteBook = function (index) {
        $scope.books.splice(index, 1);
        saveConfig();
    };

    $scope.cancelBook = function () {
        $scope.book = new Object;
        $scope.editingBook = false;
        $scope.creatingBook = false;

    };

// ----- End of books functions ------


    function saveConfig() {
        dataConfiguration.updateConfiguration($scope.configuration)
                .then(function (config) {
                    SweetAlert.swal("Configuración gardada", null, "success");
                })
                .catch(function (err) {
                    SweetAlert.swal("Ocurriu un erro inesperado :(", null, "error");
                    console.log(err);
                });
    }


    (function () {
        $rootScope.user = auth.get_user();
        $rootScope.login = false;
        $rootScope.salir = function () {
            auth.logout();
        };
    })();

    (function () {
        var opcionesTablaLocations = new Object;
        opcionesTablaLocations.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');
        opcionesTablaLocations.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1).notSortable(),
            DTColumnDefBuilder.newColumnDef(2).notSortable()
        ];
        $scope.opcionesTablaLocations = opcionesTablaLocations;
    })();

    (function () {
        var opcionesTablaIncidents = new Object;
        opcionesTablaIncidents.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');
        opcionesTablaIncidents.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1).notSortable(),
            DTColumnDefBuilder.newColumnDef(2).notSortable()

        ];
        $scope.opcionesTablaIncidents = opcionesTablaIncidents;
    })();

    (function () {
        var opcionesTablaLibros = new Object;
        opcionesTablaLibros.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');
        opcionesTablaLibros.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1).notSortable(),
            DTColumnDefBuilder.newColumnDef(2).notSortable()
        ];
        $scope.opcionesTablaLibros = opcionesTablaLibros;
    })();

    (function () {
        var opcionesTablaUsers = new Object;
        opcionesTablaUsers.dtOptions = DTOptionsBuilder
                .newOptions().withPaginationType('full_numbers')
                .withDisplayLength(10)
                .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.11/i18n/Galician.json');
        opcionesTablaUsers.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2).notSortable(),
            DTColumnDefBuilder.newColumnDef(3).notSortable()
        ];
        $scope.opcionesTablaUsers = opcionesTablaUsers;
    })();
}

