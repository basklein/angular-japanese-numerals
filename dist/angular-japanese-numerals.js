/**
    @name: angular-japanese-numerals 
    @version: 1.0.0 (20-09-2019) 
    @author: Bas Klein <basklein@basklein.com> 
    @url: https://github.com/basklein/angular-japanese-numerals#readme 
    @license: MIT
*/
angular.module('angular-japanese-numerals', []);

angular.module('angular-japanese-numerals').service('japaneseNumeralService', function () {
  this.characters = {
    integers:{
      normal:{
        1:'一',
        2:'二',
        3:'三',
        4:'四',
        5:'五',
        6:'六',
        7:'七',
        8:'八',
        9:'九'
      },
      formal:{
        1:'壱',
        2:'弐',
        3:'参',
        4:'四',
        5:'五',
        6:'六',
        7:'七',
        8:'八',
        9:'九',
        10:'拾'
      }
    },
    fractions: {
      bu: {
        1:'分',
        2:'厘',
        3:'毛',
        4:'糸',
        5:'忽',
        6:'微',
        7:'繊',
        8:'沙',
        9:'塵',
        10:'埃'
      },
      wari: {
        1:'割',
        2:'分',
        3:'厘',
        4:'毛',
        5:'糸',
      }
    },
    tens: {
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
    },
    zero: '〇'
  };

  /**
  * Converts a number or string of Arabic numerals to a string of Japanese numerals.
  * @param {number | string} value The value to convert to Japanese numerals.
  * @param {bool=} formal Optional toggle to use formal numbers.
  * @param {bool=} buFraction Optional toggle to use bu fractions instead of wari fractions.
  * @return {string} A string of Japanese numerals converted from the original value.
  */
  this.convertToJapaneseNumerals = function (value, formal, buFraction) {
    // Default optional parameters.
    formal = formal || false;
    buFraction = buFraction || false;

    // If value is null, empty or zero, return the zero kanji.
    if (value == 0) {
      return this.characters.zero;
    }

    // Convert input to string and check if not empty.
    value = value.toString() || '';

    // The value is split into integers and decimals
    value = value.split('.');
    integers = value[0] || '';
    decimals = value[1] || '';
    // The values are split into arrays and are reversed for easy power of 10 calculations.
    integers = integers.split('').reverse();
    // The decimals are trimmed back to a maximum of 10 digits in the case of bu decimals and 5 digits in the case of wari decimals.
    decimals = decimals.split('').splice(0, (buFraction ? 10 : 5));

    var integerKanjiArray = [];
    var totalRemainder = integers.length % 4;
    var highestPower = integers.length - totalRemainder;
    for (var i = 0; i < integers.length; i++) {
      /* If the digit's a 0, ignore it and go to the next one.
      * Unless 'i' is the highest power of 4.
      */
      if (!(i === highestPower - 4 && totalRemainder === 0) && !(i === highestPower) && integers[i] == 0) {
        continue;
      }

      // Calculate remainder to get power of 10 within current 10,000.
      var tenRemainder = i % 4;

      // Check if the value is a form of 1000 or 10,000.
      var isSenOrMan = (i >= 4 && tenRemainder === 0 || tenRemainder === 3);
      // If this is not the first digit, add the correct power of 10 kanji.
      if (i > 0) {
        if (tenRemainder === 0 && i > 3) {
          integerKanjiArray.push(this.characters.tens[i]);
        }
        // Use the formal form of 10 if the formal toggle is on.
        if (tenRemainder === 1 && formal) {
          integerKanjiArray.push(this.characters.integers.formal['10']);
        } else {
          integerKanjiArray.push(this.characters.tens[tenRemainder]);
        }
      }
      /* The first character from the right must always be displayed.
      * If it's a later digit and the value is greater than 1, display that character as well.
      * If the value is a form of 1000 or 10,000, the '一' has to be displayed in front of it.
      */
      if (i === 0 || integers[i] != 1 || isSenOrMan) {
        /* Add in the 1-9 numeral characters.
        * Use the formal form if the formal toggle is on.
        */
        if (formal) {
          integerKanjiArray.push(this.characters.integers.formal[integers[i]]);
        } else {
          integerKanjiArray.push(this.characters.integers.normal[integers[i]]);
        }
      }
    }

    var decimalKanjiArray = [];
    for (var i = 0; i < decimals.length; i++) {
      // If the digit's a 0, ignore it and go to the next one.
      if (decimals[i] == 0) {
        continue;
      }

        /* Add in the 1-9 numeral characters.
        * Use the formal form if the formal toggle is on.
        */
        if (formal) {
          decimalKanjiArray.push(this.characters.integers.formal[decimals[i]]);
        } else {
          decimalKanjiArray.push(this.characters.integers.normal[decimals[i]]);
        }

        /* Add the correct power of 10 kanji.
        * Use the wari or bu fractions depending on the toggle.
        */
        if (buFraction) {
          decimalKanjiArray.push(this.characters.fractions.bu[i + 1]);
        } else {
          decimalKanjiArray.push(this.characters.fractions.wari[i + 1]);
        }
      }

    // The final arrays of characters are combined and reversed back to the correct order.
    var integers = integerKanjiArray.reverse().join('');
    var decimals = decimalKanjiArray.join('');

    // The combined strings are connected through a connecting symbol.
    return (integers + (decimals ? '・' : '') + decimals);
  };
});

angular.module('angular-japanese-numerals').filter('japaneseNumerals', ['japaneseNumeralService', function (japaneseNumeralService) {

  /**
  * Converts a number or string of Arabic numerals to a string of Japanese numerals.
  * @param {number | string} input The value to convert to Japanese numerals.
  * @param {bool=} formal Optional toggle to use formal numbers.
  * @param {bool=} buFraction Optional toggle to use bu fractions instead of wari fractions.
  * @return {string} A string of Japanese numerals converted from the original value.
  */
  return function (input, formal, buFraction) {
    return japaneseNumeralService.convertToJapaneseNumerals(input, formal, buFraction);
  };
}]);
