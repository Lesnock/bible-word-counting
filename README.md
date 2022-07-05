# Bible Word Counting
A software to count how many times a word appears in the bible using bibliaonline.com.br.

Do you wanna know how many times a specific word appears in the bible?
Run this software, and discover it!

This software uses [Puppeteer](https://github.com/puppeteer/puppeteer) to web scrap the [Biblia Online](https://www.bibliaonline.com.br) site and count for the specified word.

To compile this project, just execute the command below:

```
npm run compile
```

Or

```
yarn compile
```

After compiling, just execute it with the command below:

```
node dist/index.js
```

You can specify the word (or expression) to be searched setting the `WORD_FOR_SEARCH` constant located in the `src/index.ts` file:
```javascript
const WORD_FOR_SEARCH = 'Deus'
```

You can either specify the bible ersion that will be used setting the `BIBLE_VERSION` constant:

```javascript
const BIBLE_VERSION = 'acf'
```

Enjoy!
