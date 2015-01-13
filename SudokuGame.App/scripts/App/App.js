(function (window, angular) {
    var app = angular.module("SudokuGame", []);

    app.factory('sudokuService', ['$http', function ($http) {
        var service = {};
        
        service.transformSudoku = function (data) {
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
        };
        service.newSudoku = function () {
            var data = [
                [1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 3, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 4, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 5, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 6, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 7, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 8, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 9]
            ];
            return service.transformSudoku(data);
        };

        return service;
    }]);

    app.directive();

    app.controller('SudokuController', ['$scope', 'sudokuService', function ($scope, sudokuService) {
        $scope.sudokuGrid = sudokuService.newSudoku();
    }]);


})(window, window.angular);