# markdown-it-pangu-pro

A 
[markdown-it](https://github.com/markdown-it/markdown-it) 
plugin that 
inserts a small gap between CJK characters and Latin letters or digits
which is also known as 
[pangu spacing](https://github.com/vinta/pangu.js).

```
中文hello  →  中文<gap>hello
hello中文  →  hello<gap>中文
```

The existing 
[markdown-it-pangu](https://github.com/shigma/markdown-it-pangu) by [shigma](https://github.com/shigma)
solves this problem 
by inserting a plain space character between CJK and Latin text. 
This is imprecise — a space character has no fixed width and varies by font. 
This plugin builds on that idea and instead injects a `<span>` 
with an explicit, configurable width, 
giving you typographically accurate and consistent spacing 
across all fonts and environments.

The gap span uses inline styles, so no external CSS is required.

## Install

```sh
npm install markdown-it-pangu-pro
```

Or directly from GitHub:

```sh
npm install github:Zhou-Xuanyu/markdown-it-pangu-pro
```

## Usage

```js
import markdownIt from "markdown-it";
import markdownItPanguPro from "markdown-it-pangu-pro";

const md = markdownIt();
md.use(markdownItPanguPro);
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | string | `"0.25em"` | Width of the gap span |

```js
md.use(markdownItPanguPro, { width: "0.2em" });
```

## CJK ranges covered

- `一-鿿` — main CJK Unified Ideographs (most Chinese characters)
- `㐀-䶿` — CJK Extension A
- `぀-ゟ゠-ヿ` — Japanese Hiragana and Katakana
