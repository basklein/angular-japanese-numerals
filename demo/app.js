angular.module('app', ['angular-japanese-numerals']);

angular.module('app')
    .controller('appController', function ($scope, $filter) {
        $scope.testString = "469";
        $scope.testNumber = 469;

        $scope.javascriptNormal = $filter('japaneseNumerals')(469);
        $scope.javascriptFormal = $filter('japaneseNumerals')(469, true);
    });
