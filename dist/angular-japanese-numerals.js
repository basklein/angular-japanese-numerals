/**
    @name: angular-japanese-numerals 
    @version: 0.1.0 (23-06-2019) 
    @author: Bas Klein <basklein@basklein.com> 
    @url: https://github.com/basklein/angular-japanese-numerals#readme 
    @license: MIT
*/
angular.module('angular-japanese-numerals', []);

angular.module('angular-japanese-numerals').service('japaneseNumeralService', function () {
  this.characters = {
    normal:{
      '1':'一',
      '2':'二',
      '3':'三',
      '4':'四',
      '5':'五',
      '6':'六',
      '7':'七',
      '8':'八',
      '9':'九'
    },
    formal:{
      '1':'壱',
      '2':'弐',
      '3':'参',
      '4':'四',
      '5':'五',
      '6':'六',
      '7':'七',
      '8':'八',
      '9':'九',
      '10':'拾'
    }
  };
  this.tens = {
    1:'十',
    2:'百',
    3:'千',
    4:'万',
    8:'億',
    12:'兆',
    16:'京',
    20:'垓',
    24:'𥝱',
    28:'穣',
    32:'溝',
    36:'澗',
    40:'正',
    44:'載',
    48:'極'
  };
  this.zeroCharacter = '〇';

  /**
  * Converts a number or string of Arabic numerals to a string of Japanese numerals.
  * @param {number | string} value The value to convert to Japanese numerals.
  * @param {bool=} formal Optional toggle to use formal numbers.
  * @return {string} A string of Japanese numerals converted from the original value.
  */
  this.convertToJapaneseNumerals = function (value, formal) {
    // Default optional parameters.
    formal = formal || false;

    // If value is null, empty or zero, return the zero kanji.
    if (value == 0) {
      return this.zeroCharacter;
    }

    // Convert input to string and check if not empty.
    value = value.toString() || '';

    // TODO: Add decimal support
    value = value.split('.')[0];
    // The value is split into an array and is reversed for easy power of 10 calculations.
    value = value.split('').reverse();

    var kanjiArray = [];
    var totalRemainder = value.length % 4;
    var highestPower = value.length - totalRemainder;
    for (var i = 0; i < value.length; i++) {
      /* If the digit's a 0, ignore it and go to the next one.
      * Unless 'i' is the highest power of 4.
      */
      if (!(i === highestPower - 4 && totalRemainder === 0) && !(i === highestPower) && value[i] == 0) {
        continue;
      }

      // Calculate remainder to get power of 10 within current 10,000.
      var tenRemainder = i % 4;

      // Check if the value is a form of 1000 or 10,000.
      var isSenOrMan = (i >= 4 && tenRemainder === 0 || tenRemainder === 3);
      // If this is not the first digit, add the correct power of 10 kanji.
      if (i > 0) {
        if (tenRemainder === 0 && i > 3) {
          kanjiArray.push(this.tens[i]);
        }
        // Use the formal form of 10 if the formal toggle is on.
        if (tenRemainder === 1 && formal) {
          kanjiArray.push(this.characters.formal['10']);
        } else {
          kanjiArray.push(this.tens[tenRemainder]);
        }
      }
      /* The first character from the right must always be displayed.
      * If it's a later digit and the value is greater than 1, display that character as well.
      * If the value is a form of 1000 or 10,000, the '一' has to be displayed in front of it.
      */
      if (i === 0 || value[i] != 1 || isSenOrMan) {
        /* Add in the 1-9 numeral characters.
        * Use the formal form if the formal toggle is on.
        */
        if (formal) {
          kanjiArray.push(this.characters.formal[value[i]]);
        } else {
          kanjiArray.push(this.characters.normal[value[i]]);
        }
      }
    }

    // The final array of characters is combined and reversed back to the correct order.
    return kanjiArray.reverse().join('');
  };
});

angular.module('angular-japanese-numerals').filter('japaneseNumerals', ['japaneseNumeralService', function (japaneseNumeralService) {

  /**
  * Converts a number or string of Arabic numerals to a string of Japanese numerals.
  * @param {number | string} input The value to convert to Japanese numerals.
  * @param {bool=} formal Optional toggle to use formal numbers.
  * @return {string} A string of Japanese numerals converted from the original value.
  */
  return function (input, formal) {
    return japaneseNumeralService.convertToJapaneseNumerals(input, formal);
  };
}]);
