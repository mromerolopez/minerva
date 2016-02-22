'use strict';

app.controller('DocumentosCtrl', DocumentosCtrl);


function DocumentosCtrl($scope) {
            $scope.message = 'Hello';

            var documentos = [];

            for (var i = 0; i < 10; i++) {
                var documento = {
                    titulo: "eli",
                    paginas: "20"
                };
                documentos.push(documento);
            }
            
            $scope.documentos = documentos;
            
            $scope.verDocumento = function(doc){
                console.log(doc);
            };

        }