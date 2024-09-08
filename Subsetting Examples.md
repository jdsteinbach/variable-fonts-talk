# Case Studies in Font Subsetting

## [iA Writer Quattro](https://github.com/iaolo/iA-Fonts/tree/master/iA%20Writer%20Quattro)

### Initial Files Provided

iA Writer provided variable fonts as 2 `ttf`s (Upright and Italic), each ~150kb.

_Note: iA Writer provided static fonts as `woff2` (Regular, Italic, Bold, Bold Italic) around 45kb each. Unfortunately this can skew people's initial performance reaction away from variable fonts._

* Static: 4 requests for 168kb
* Variable: 2 requests for 302kb

### Step 1: Convert Everything to `woff2`

I used [`pyftsubset` from `fonttools`](https://github.com/fonttools/fonttools) to convert the variable `ttf`s to `woff2` - no loss of any features, variable axes, characters, etc: just better file type. Converting `ttf` to `woff2` reduced 70% of the total size! Now variable fonts are winning the perf contest handily: both # of requests & total bytes.

```sh
pyftsubset iAWriterQuattroV.ttf \
  --glyphs='*' \
  --layout-features='*' \
  --flavor=woff2
```

* Static: 4 requests for 168kb
* Variable: 2 requests for 92kb

### Step 2: Subset for English Content

These fonts were designed for macOS / iOS apps that are available around the world. They came with support for 49 languages, including 850-1182 glyphs (Regular has more glyphs than Italic).

Let's say I'm not translating my content world-wide, so I only need English glyphs. I took all the `woff2` files (static & variable) and ran a command from [`glyphhanger` (from Filament Group)](https://github.com/filamentgroup/glyphhanger) on them.

```sh
glyphhanger --subset=*.woff2 --US_ASCII --formats=woff2
```

This takes each `woff2` file (static or variable), subsets it for only the character set used by US ASCII (English letters, numbers, punctuation), and outputs it as a new `woff2` file.

The reduction here was _amazing_ - another 70% shaved off the files.

* Static: 4 requests for 46kb
* Variable: 2 requests for 26kb

### Bonus Steps: Custom Subsetting

You can also use `glyphhanger` to subset for your specific content!

Here, I'm subsetting to match the exact characters needed for the build HTML in a single page site (not an SPA).

```sh
glyphhanger ./dist/index.html --subset=*.woff2 --formats=woff2
```

You can also crawl a site (even a local one) to find all the characters it uses:

```sh
glyphhanger http://localhost:3000 --spider --subset=./src/fonts/recursive.woff2 --formats=woff2
```

Or just manually pass it a string (perhaps a font used only for a few fixed characters, like a wordmark / "logo"?):

```sh
glyphhanger --whitelist=LOGOMARK --subset=./src/fonts/recursive.woff2 --formats=woff2
```

### Skipping Step 1

I could have used `glyphhanger` to skip right from `ttf` to subset `woff2`. It uses `pyftsubset` under the hood, so the results would be identical:

```sh
glyphhanger --subset=*.ttf --US_ASCII --formats=woff2
```

## [Recursive](https://www.recursive.design/)

My slide deck uses Recursive variable font. It includes axes for weight, slant, monospace, casual (brush-strokiness), and cursive (shape of slanted letters). That much variation covers my _entire_ typography for a code slide deck and is worth about 8 static fonts to me. (Body Regular, Body Italic, Body Bold, Body Bold Italic, Display Regular, Display Bold, Code, Code Bold).

Initial size of the `woff2` is 275kb - seems big but it's comparable to 8 static files at 30-40kb each.

So I used `glyphhanger` to subset to match my content exactly:

```sh
glyphhanger ./dist/index.html --subset=*.woff2 --formats=woff2
```

That reduced the size by almost 30%. Not as drastic as Quattro above, but I'm now getting at least 8 font-faces worth of typography for ~25kb per style, and … I've got the potential to use far more, since it's variable!

* Pre-subset: 275kb
* Subset: 195kb
