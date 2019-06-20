angular.module('app', ['angular-japanese-numerals']);

angular.module('app')
    .controller('appController', function ($scope) {
        $scope.testString = "469";
        $scope.testNumber = 469;
    });
