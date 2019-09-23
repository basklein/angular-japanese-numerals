[![npm version](https://badge.fury.io/js/angular-japanese-numerals.svg)](https://badge.fury.io/js/angular-japanese-numerals)
[![GitHub issues](https://img.shields.io/github/issues/basklein/angular-japanese-numerals.svg?style=flat-square)](https://github.com/basklein/angular-japanese-numerals/issues)
[![GitHub license](https://img.shields.io/github/license/basklein/angular-japanese-numerals.svg?style=flat-square)](https://github.com/basklein/angular-japanese-numerals/blob/master/LICENSE)

# angular-japanese-numerals
Japanese numeral service and filters for AngularJS

## Demo
[demo on plnkr](https://plnkr.co/edit/GZj6hyUirAyvUDEUNrdG?p=preview)

## Description
This is a service for AngularJS that converts common Arabic numerals to Japanese numerals. This service can be used as is, or through the filters `japaneseNumerals` and `simpleJapaneseNumerals`.

The `japaneseNumerals` filter will convert the Arabic numerals to Japanese numerals, including the power of ten kanji characters.

The `simpleJapaneseNumerals` filter will convert the Arabic numerals to Japanese numerals, using the '〇' character and positions instead of the power of ten kanji characters.

Both filters can be adjusted with parameters as described in the 'Documentation' section.

## Usage

1. Install via [npm](https://www.npmjs.com/) or downloaded files:
    1. via npm: `npm install --save angular-japanese-numerals`
    2. via [downloaded files](https://github.com/basklein/angular-japanese-numerals/master)
2. Add `angular-japanese-numerals` to your application's module dependencies.
3. Include dependencies and angular-japanese-numerals in your HTML.
    - When using npm
    ```html
    <script src="node_modules/angular-japanese-numerals/dist/angular-japanese-numerals.min.js"></script>
    ```
    - When using downloaded files
    ```html
    <script src="YOUR_PATH/angular-japanese-numerals.min.js"></script>
    ```
4. Use the angular filters `japaneseNumerals` and `simpleJapaneseNumerals`, or use the angular service `japaneseNumeralService`.

## Documentation

### Services

#### japaneseNumeralService
##### characters
Object containing all Japanese numeral characters.

##### convertToJapaneseNumerals
Converts a number or string of Arabic numerals to a string of Japanese numerals with power of ten characters.
* `@param {number | string}` value The value to convert to Japanese numerals.
* `@param {bool=} formal` Optional toggle to use formal numbers.
* `@param {bool=} buFraction` Optional toggle to use bu fractions instead of wari fractions.
* `@return {string}` A string of Japanese numerals converted from the original value.

##### convertToSimpleJapaneseNumerals
Converts a number or string of Arabic numerals to a string of Japanese numerals without the power of ten characters.
* `@param {number | string}` value The value to convert to Japanese numerals.
* `@param {bool=} formal` Optional toggle to use formal numbers.
* `@return {string}` A string of Japanese numerals converted from the original value.

### Filters
##### japaneseNumerals
Converts a number or string of Arabic numerals to a string of Japanese numerals with power of ten characters.
* `@param {number | string} input` The value to convert to Japanese numerals.
* `@param {bool=} formal` Optional toggle to use formal numbers.
* `@param {bool=} buFraction` Optional toggle to use bu fractions instead of wari fractions.
* `@return {string}` A string of Japanese numerals converted from the original value.

##### simpleJapaneseNumerals
Converts a number or string of Arabic numerals to a string of Japanese numerals without power of ten characters.
* `@param {number | string} input` The value to convert to Japanese numerals.
* `@param {bool=} formal` Optional toggle to use formal numbers.
* `@return {string}` A string of Japanese numerals converted from the original value.

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
