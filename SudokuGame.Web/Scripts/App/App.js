/// <reference path="../_references.js" />
(function (window, angular) {
    'use strict';

    var app = angular.module("SudokuGame", []);

    app.service('sudokuService', ['$http', '$q', '$log', function ($http, $q, $log) {
        var srv = {};
        
        srv.transformSudoku = function (data) {
            var structure = [], current, c = 1, status = [];

            for (var i = 0; i < data.length; ++i) {
                for (var j = 0; j < data[i].length; ++j) {
                    current = data[i][j];
                    if (!angular.isArray(structure[i])) {
                        structure[i] = [];
                    }
                    status = [];
                    if (current != 0) {
                        status.push("fixed");
                    }

                    structure[i][j] = {
                        fixed: current != 0,
                        value: current > 0 ? current : '',
                        valid: '',
                        status: status,
                        x: i,
                        y: j,
                        c: c
                    }
                    ++c;
                }
            }
            return structure;
        }

        srv.getSudokuData = function (sudoku) {
            var data = [], currentValue;
            for (var i = 0; i < sudoku.length; ++i) {
                for (var j = 0; j < sudoku[i].length; ++j) {
                    currentValue = sudoku[i][j].value;

                    if (!angular.isArray(data[i])) {
                        data[i] = [];
                    }

                    data[i][j] = currentValue == "" ? 0 : parseInt(currentValue);
                }
            }
            return data;
        }

        srv.newSudoku = function () {

            return $http.get('/api/sudokus/new').then(
                  function (response) {
                      return srv.transformSudoku(response.data);
                  });
        }

        srv.validateSudoku =  function (sudoku) {
            var data = srv.getSudokuData(sudoku);
            return $http.post('/api/sudokus/validate', data).then(
                  function (response) {
                      return response.data;
                  });
        }

        return srv;
    }]);

    app.controller('SudokuController', ['$scope', 'sudokuService', '$log', function ($scope, sudokuService, $log) {

        $scope.message = { type: "alert-info", text: "Disfrute resolviendo este fantástico sudoku!" };


        // Cargar nuevo sudoku
        var promiseGet = sudokuService.newSudoku();

        promiseGet.then(function (data) {
            $scope.sudokuGrid = data;
        },function (errorPl) {
            $log.error('failure loading ', errorPl);
        });

        $scope.validateSudoku = function () {
            sudokuService.validateSudoku($scope.sudokuGrid).then(function (data) {
                if (data) {
                    $scope.message = { type: "alert-success", text: "Los datos introducidos hasta el momento son correctos" };
                }
                else {
                    $scope.message = { type: "alert-warning", text: "Ups, los datos del sudoku son incorrectos." };
                }
            }, function (error) {
                $log.error('failure validating ', error);
            });
        }

    }]);


})(window, window.angular);