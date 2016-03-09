'use strict';

app.controller('TestsCtrl', TestsCtrl);

function TestsCtrl($scope, $http, dataBorrowers, dataConfiguration, auth) {

    var searched_item = new Object;
    var user = auth.get_user();

    dataConfiguration.getConfiguration(user._id)
            .then(function (config) {
                console.log(config);
            })
            .catch(function(err){
                console.log(err);
            });

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
        console.log(searched_item);
    };

}