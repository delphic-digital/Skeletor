# Front End build tooling boilerplate 

_Skeletor_ is an opinionated starting point for front end projects at Hero Digital, but there's nothing proprietery in here nor is it tied to any particular cms. It is designed to give you a quick and organized way to start developing front end code.

Note that "💀" marks things that you will likely need to configure for each project.

## Quick start

 - Copy the repo _(don't clone it, updates aren't guarenteed to be backwards compatible - if that's what you want, look at [Brunch](http://brunch.io/))_
 - `npm install`
 - `npm start`
 - `npm run build`
 - And if you feel like leveling up:
 - `npm run test-js` To run js unit tests! modulefilename.test.js _Requires [Ava](https://github.com/avajs/ava)_ `npm i -g ava`
 - `npm run test-a11y` To run accessibility tests on your html _Requires [Pa11y](https://github.com/pa11y/pa11y)_ `npm i -g pa11y`
 - `npm run test-speed` To get speed metrics _Requires [pwmetrics](https://github.com/paulirish/pwmetrics)_ `npm i -g pwmetrics`

## Static markup

Your choice between: 
 - **[Pug](https://pugjs.org)** (Jade rebranded) for writing static markup with all the power of an actual templating language.
 - **Server Side Includes** for those ASAP projects when the backend isn't quite ready yet.

## General

Configuration options in ./skeletor.config.js

 - 💀 `useBrowserSync` allows you to disable it
    - `useBrowserSync:true` browsersync will be started on `npm start`
    - `useBrowserSync:false` will not start browsersync. _(Because sometimes you're proxying a server that is just painfully slow)_
 - 💀 `proxy` for BrowserSync
    - `proxy = false` browsersync will serve the static files in ./dist/_markup
    - `proxy = 'localproject.dev'` BrowserSync will proxy that url
 - 💀 `localUrl` used in the pa11y & pwmetrics configuration for testing targets
 - 💀 `stagingUrl` Also pa11y & pwmetrics - you'll have to set this in their config to run staging tests
 - 💀 `liveUrl` Same again. This is where speed testing will really count (pwmetrics is already pointing at this so you can run baseline speed tests).
 - 💀 local path variables _(For those projects that need your JS dist files in one place, your CSS in another, and your assets in a third.)_
    - `fedSrcRoot` The src directory for the working files, used as a root to the other src path variable
    - `fedDistRoot` Same as src, but for dist! _Note if your dist dir has to be split by type, this may become redundant_
    - Javascript paths
        - `srcJsDir`
        - `distJsDir`
    - Styling paths
        - `srcScssDir`
        - `distCssDir`
        - 💀 `distCssPngSpriteDirUrl` This sets the URL that will be used by production CSS to locate the png sprite.
    - Raster sprite (png) paths
        - `srcPngDir`
        - 💀 `distSpritePngDir` png sprite, will probably have to be pointed to some kind of theme assets dir relative to the CMS your in.
    - SVG sprite paths
        - `srcSvgDir`
        - 💀 `distSpriteSvgDir` The SVG sprite to be `<use>`d either as an external sprite or rendered into page templates.
 - `templateLang` 'pug', 'ssi', or `false` if you don't need it
    - `srcPugDir` if running pug, these are used as the static markup source
    - `srcSSIDir` or if running ssi, these are used
    - `distTemplateDir` either way, static markup gets rendered here

## Testing

The testing tools are not installed locally by default, #agencylife. To install all the testing tools: `npm i -g ava pa11y pwmetrics`

### Accesability testing

 - `npm run test-a11y`

Testing the markup with [Pa11y](http://pa11y.org/). Will test the index file in dist by default, but switches to the proxy when you set that.

### Performance testing

 - `npm run test-speed`

Testing with [PWMetrics](https://www.npmjs.com/package/pwmetrics). It will open a browser, let it sit for a while then it should close and log the test results to the console. Note that this can be set up to save results into google sheets, will need some research and configuration to do that though.

### JS Unit testing

 - `npm run test-js`

Testing with [AVA](https://github.com/avajs/ava). This will only ever test your local source code, it can't test distributed code through a url. Also test results are output to the command line. If the test script ends in npm ERR! you've probably got a few failing tests, scroll up to read them!

## JS

 - ES6: write modern modular Javascript!
 - Bundled by Webpack, take your pick of the plugins available there
 - [ESLint](https://eslint.org/): code styles defined in the .eslintrc.js file
 - Bundle size analyzer! On `npm run build` opens a visual to give you an idea of how much JS you're pulling in. Note that this is showing the src, not dist. TODO analyse the dist

## SASS & PostCSS

 - [Susy](http://oddbird.net/susy/)
 - [Breakpoints](http://breakpoint-sass.com/)
 - [Bourbon](http://bourbon.io/)
 - [Sass-lint](https://github.com/sasstools/sass-lint)
 - [Postcss](http://postcss.org/) & [css next](http://cssnext.io/features/)

## SVG Spriting & inline Sass

Place individual svg files in ./src/sprite_svg/

 - 💀 Compiles svgs into a sprite file ready to be `<use>`d
 - Generates _svg.scss which provides the `inline-svg` mixin for setting svgs as css backgrounds

## Png Sprites

Place individual png files in ./src/sprite_png/

 - 💀 Sprites the png files into pngSprite.png
 - Generates _png.scss which provieds the `sprites` mixin and utility classes to set pngs as css backgrounds (I think - need to verify)

## Editor plugins

_These are not required, just a few recommended plugins that work with well with the tools Skeletor uses._

For VS Code:

 - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) will underline code formatting issues so you can catch them without relying on the command line output.
 - [Sass Lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint) same for Sass.
 - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) Will the size of the js you import and warn when it's getting too big.

## Things that still need doing

 - TODO: configure JS linting to standards we all agree on
 - TODO: configure Sass linting to standards we all agree on
 - TODO: SVG png sprite fallback?
 - TODO: [Hot module reloading](https://css-tricks.com/combine-webpack-gulp-4/), might not be worth it - we don't build proper spas
 - TODO: [Code splitting](https://webpack.js.org/plugins/commons-chunk-plugin/) needs optmization work, again probably not be worth it for most projects.
 - TODO: set up pwmetrics to submit reports to google drive - get performance reports graphed over time!
 - TODO: switch to `babel-preset-env` and link to docs for it
 - TODO: https://github.com/sindresorhus/gulp-imagemin image minification
 - TODO: api testing