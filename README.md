# Front End build tooling boilerplate 

_Skeletor_ is an opinionated starting point for front end projects. Mainly it was developed for projects at Delphic Digital, but it was designed to be agnostic, so any project is capable of using it. It is designed to give you a quick and organized way to start developing websites with best practices in mind.

 - `npm install`
 - `npm start` runs a build, starts the watchers, fires up browsersync
 - `npm run build` runs a build
 - `npm test` runs the tests - not that there are any yet

💀 - Will need configured for each project.

 - TODO: [Hot module reloading](https://css-tricks.com/combine-webpack-gulp-4/)
 - TODO: [Code splitting](https://webpack.js.org/plugins/commons-chunk-plugin/), modules defined in >3 chunks will be split out into their own chunk. 
 - TODO: configure linting to standards we all agree on
 - TODO: Testing examples (ava)
 - TODO: SVG png sprite fallback?
 - TODO: check sass linting is actually working

## General

 - 💀 local proxy (./gulpfile.js `global.skeletor.proxy`). Initially `false` & serving static files. If set, will switch from static to a proxy server.
 - toggle BrowserSync (./gulpfile.js `global.skeletor.useBrowserSync`) Initially `true`. Set to `false` for slow servers so you can reload manually.
 - 💀 FED src files directory (./gulpfile.js `const fedSrcRoot = ...`). For a single project repo, package.json & fed src dir should stay in the root, renaming it's fine though.
 - 💀 JS distribution directory (./gulpfile.js `global.skeletor.distJsDir`)
 - 💀 CSS distribution directory (./gulpfile.js `global.skeletor.distCssDir`)
 - 💀 SVG distribution directory (./gulpfile.js `global.skeletor.distSpriteSvgDir`)
 - 💀 png distribution directory (./gulpfile.js `global.skeletor.distSpritePngDir`)
 - 💀 CSS sprite sheet directory url (./gulpfile.js `global.skeletor.distCssPngSpriteDirUrl`) 

## JS

 - ES6: write modern modular Javascript!
 - [ESLint](https://eslint.org/): code styles defined in the .eslintrc.js file

## SASS

 - [Susy](http://oddbird.net/susy/)
 - [Breakpoints](http://breakpoint-sass.com/)
 - [Bourbon](http://bourbon.io/)
 - [Sass-lint](https://github.com/sasstools/sass-lint)
 - [Postcss](http://postcss.org/) & [css next](http://cssnext.io/)

## SVG

Place individual svg files in ./src/sprite_svg/

 - 💀 Compiles svgs into a sprite file ready to be `<use>`d
 - Generates _svg.scss which provides the `inline-svg` mixin for setting svgs as css backgrounds

## Png Sprites

Place individual png files in ./src/sprite_png/

 - 💀 Sprites the png files into pngSprite.png
 - Generates _png.scss which provieds the `sprites` mixin and utility classes to set pngs as css backgrounds (I think - need to verify)

## Editor plugins

For VS Code:

 - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) will underline code formatting issues so you can catch them without relying on the command line output.
 - [Style Lint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) same for Sass.
 - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) Will the size of the js you import and warn when it's getting too big.