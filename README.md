# angular-japanese-numerals
Japanese numeral filter for AngularJS

## Demo
[demo on plnkr](https://plnkr.co/edit/GZj6hyUirAyvUDEUNrdG?p=preview)

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
```

# LICENSE
MIT
