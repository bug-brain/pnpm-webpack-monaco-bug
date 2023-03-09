## Example of webpack / monaco-editor-webpack-plugin producing broken code when using pnpm and disabling symlinks

### Setup
```bash
pnpm install
pnpm build
```
Format `./dist/main.js`.
Open `./dist/index.html` in browser.

### Error
```
Uncaught TypeError: can't access property "csharp", h is undefined
    g file:///path/to/repo/dist/main.js:14099
    18521 file:///path/to/repo/dist/main.js:14127
    o file:///path/to/repo/dist/main.js:161097
    83226 file:///path/to/repo/dist/main.js:860
    o file:///path/to/repo/dist/main.js:161097
    50695 file:///path/to/repo/dist/main.js:14066
    o file:///path/to/repo/dist/main.js:161097
    12448 file:///path/to/repo/dist/main.js:14111
    o file:///path/to/repo/dist/main.js:161097
    83820 file:///path/to/repo/dist/main.js:878
    o file:///path/to/repo/dist/main.js:161097
    32668 file:///path/to/repo/dist/main.js:125313
    o file:///path/to/repo/dist/main.js:161097
    57832 file:///path/to/repo/dist/main.js:896
    o file:///path/to/repo/dist/main.js:161097
    <anonymous> file:///path/to/repo/dist/main.js:161170
    <anonymous> file:///path/to/repo/dist/main.js:161171
    <anonymous> file:///path/to/repo/dist/main.js:161173

```

### Explanation
The `monaco-editor` module `src/basic-languages/_.contribution.ts` looks something like this:
```ts
import { languages, editor } from '../fillers/monaco-editor-core';

interface ILang extends languages.ILanguageExtensionPoint {
	loader: () => Promise<ILangImpl>;
}

interface ILangImpl {
	conf: languages.LanguageConfiguration;
	language: languages.IMonarchLanguage;
}

const languageDefinitions: { [languageId: string]: ILang } = {};
// ...
export function registerLanguage(def: ILang): void {
	const languageId = def.id;
	languageDefinitions[languageId] = def;
	// ...
}
```
In the actual code `g` aka `registerLanguage` is exposed before `h` aka `languageDefinitions` is initialized.
This happens even if symlinks are enabled, but then it is not called too early.
```js
// id 50695
(e, t, i) => {
    "use strict";
    i.d(t, {H: () => g});
    // This calls H before the following code is executed.
    var n = i(83226);
    // ...
    var h = {};
    // ...
    function g(e) {
        const t = e.id;
        h[t] = e;
        // ...
    }
}
```