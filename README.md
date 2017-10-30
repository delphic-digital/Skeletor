# Front End build tooling boilerplate 

_Skeletor_ is an opinionated starting point for front end projects. Mainly it was developed for projects at Delphic Digital, but it was designed to be agnostic, so any project is capable of using it. It is designed to give you a quick and organized way to start developing websites with best practices in mind.

Note that "💀" marks things that you will likely need to configure for each project.

## Quick start

 - Copy the repo _(don't clone it, updates aren't guarenteed to be backwards compatible - if that's what you want, look at [Brunch](http://brunch.io/))_
 - `npm install`
 - `npm start`
 - `npm run build`
 - `npm run test` (_Note this will require some global installs, trying to keep the critical path a little lighter for you._) `npm i -g ava pwmetrics`
 - You might also want to remove ./src/scss/future from production projects. It's a place where only our dreams can fly.

## General

Configuration options in ./skeletor.config.js

 - 💀 `proxy` to set what browsersync points at
    - `false` will set browsersync to static mode and serve files from the dist folder
    - `localproject.dev` will set browsersync to proxy that url
 - `testUrl` built from `proxy`, this will be your local _(Note to run tests against your local it has to be running already)_
 - 💀 `stagingUrl` so we can point tests at staging
 - 💀 `liveUrl` and also test live!
 - 💀 `useBrowserSync` allows you to disable it
    - `true` browsersync will be started on `npm start`
    - `false` will not start browsersync. _(Because sometimes you're proxying a server that is just painfully slow)_
 - 💀 local path variables _(If a system needs your JS dist files in one place, your CSS in another, and your assets in a third. It happens.)_
    - `fedSrcRoot` The src directory for the working files, used as a root to the other src path variable
        - `srcJsDir`
        - `srcScssDir`
        - `srcSvgDir`
        - `srcPngDir`
    - `fedDistRoot` Same as src, but for dist! _Note if your dist dir has to be split by type, this may become redundant_
        - `distJsDir`
        - `distCssDir`
        - 💀 `distSpriteSvgDir` The SVG sprite to be `<use>`d either as an external sprite or rendered into page templates.
        - 💀 `distSpritePngDir` png sprite, will probably have to be pointed to some kind of theme assets dir relative to the CMS your in.
        - 💀 `distCssPngSpriteDirUrl` This sets the URL that will be used by production CSS to locate the png sprite.

## Testing

Also the testing tools aren't installed to the local project, they're not on the critical path (for now) which we're trying to keep light. So you will have to install these globally (unless you already have them in which case, begin!):

 - `npm i -g ava pwmetrics`

### Accesability testing

 - `npm run test:a11y`

Testing the markup with [Pa11y](http://pa11y.org/). Will test the index file in dist by default, but switches to the proxy when you set that.

### Performance testing

 - `npm run test:performance`

Testing with [PWMetrics](https://www.npmjs.com/package/pwmetrics). It will open a browser, let it sit for a while then it should close and log the test results to the console. Note that this can be set up to save results into google sheets, will need some research and configuration to do that though.

### JS Unit testing

 - `npm run test:unit`

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
 - TODO: Package-lock.json (when we're all on or beyond npm5) / shrinkwrap on build?
 - TODO: set up pwmetrics to submit reports to google drive - get performance reports graphed over time!