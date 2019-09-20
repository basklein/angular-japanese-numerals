[![npm version](https://badge.fury.io/js/angular-japanese-numerals.svg)](https://badge.fury.io/js/angular-japanese-numerals)
[![GitHub issues](https://img.shields.io/github/issues/basklein/angular-japanese-numerals.svg?style=flat-square)](https://github.com/basklein/angular-japanese-numerals/issues)
[![GitHub license](https://img.shields.io/github/license/basklein/angular-japanese-numerals.svg?style=flat-square)](https://github.com/basklein/angular-japanese-numerals/blob/master/LICENSE)

# angular-japanese-numerals
Japanese numeral filter for AngularJS

## Demo
[demo on plnkr](https://plnkr.co/edit/eK0dOA?p=info)

## Usage

1. Install via [npm](https://www.npmjs.com/) or downloaded files:
    1. via npm: `npm install --save angular-japanese-numerals`
    2. via [downloaded files](https://github.com/basklein/angular-japanese-numerals/master)
2. Add `angular-japanese-numerals` to your application's module dependencies.
3. Include dependencies and angular-japanese-numerals in your HTML.
    1. When using npm
    ```html
    <script src="node_modules/angular-japanese-numerals/dist/angular-japanese-numerals.min.js"></script>
    ```

    2. When using downloaded files
    ```html
    <script src="YOUR_PATH/angular-japanese-numerals.min.js"></script>
    ```
4. Use the angular filter `japaneseNumerals` like this: `{{ number | japaneseNumerals }}`

## Sample

HTML
```html
<p>
  {{ 11 | japaneseNumerals }} : 11 normal
</p>
<p>
  {{ 17 | japaneseNumerals: true }} : 17 formal
</p>
<p>
  {{ '151' | japaneseNumerals }} : '151' normal
</p>
<p>
  {{ 10.51 | japaneseNumerals: false: true }} : 10.51 normal buFraction
</p>
```

Result:
```html
<p>
  十一 : 11 normal
</p>
<p>
  拾七 : 17 formal
</p>
<p>
  百五十一 : '151' normal
</p>
<p>
  十・五分一厘 : 10.51 normal
</p>
```

Javascript:
```javascript
angular.module('app', ['angular-japanese-numerals']);

angular.module('app')
    .controller('appController', function ($scope, $filter) {
        $scope.javascriptNormal = $filter('japaneseNumerals')(469);
        $scope.javascriptFormal = $filter('japaneseNumerals')(469, true);
    });
```

Result:
```html
<p>
  四百六十九 : $scope.javascriptNormal 469 normal
</p>
<p>
  四百六拾九 : $scope.javascriptFormal 469 formal
</p>
```

# LICENSE
MIT
