# Front End build tooling boilerplate 

_Skeletor_ is an opinionated starting point for front end projects at Hero Digital, but there's nothing proprietery in here nor is it tied to any particular cms. It is designed to give you a quick and organized way to start developing front end code.

Note that "💀" marks things that you will likely need to configure for each project.

## Quick start

 - Copy the repo _(don't clone it, updates aren't guarenteed to be backwards compatible - if that's what you want, look at [Brunch](http://brunch.io/))_
 - `npm install`
 - `npm start`
 - `npm run build`

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
    - SVG sprite paths
        - `srcSvgDir`
        - 💀 `distSpriteSvgDir` The SVG sprite to be `<use>`d either as an external sprite or rendered into page templates.


## JS

 - ES6: write modern modular Javascript!
 - Bundled by Webpack, take your pick of the plugins available there
 - Bundle size analyzer! On `npm run build` opens a visual to give you an idea of how much JS you're pulling in. Note that this is showing the src, not dist. TODO analyse the dist

## SASS & PostCSS

 - [Breakpoints](http://breakpoint-sass.com/)
 - [Postcss](http://postcss.org/) & [css next](http://cssnext.io/features/)

## SVG Spriting & inline Sass

Place individual svg files in ./src/sprite_svg/

 - 💀 Compiles svgs into a sprite file ready to be `<use>`d
 - Generates _svg.scss which provides the `inline-svg` mixin for setting svgs as css backgrounds


## Editor plugins

_These are not required, just a few recommended plugins that work with well with the tools Skeletor uses._

For VS Code:

 - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) will underline code formatting issues so you can catch them without relying on the command line output.
 - [Sass Lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint) same for Sass.
 - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) Will the size of the js you import and warn when it's getting too big.

## Things that still need doing

 - TODO: configure JS linting to standards we all agree on
 - TODO: configure Sass linting to standards we all agree on
 - TODO: switch to `babel-preset-env` and link to docs for it
