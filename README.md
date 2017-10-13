# The Webpack version of Skeletor

## JS

 - ES6: write modern JS!
 - [ESLint](https://eslint.org/), also there's a [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). This is hooked up to webpack so you'll see it shouting at you in the console.
 - TODO: Code splitting. [In progress](https://webpack.js.org/plugins/commons-chunk-plugin/)

## SASS

 - Susy
 - Breakpoints
 - Bourbon
 - [Sass-lint](https://github.com/sasstools/sass-lint) (not scss-lint), there's a [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint)
 - TODO: set up inline SVG SASS

## SVG

 - TODO: compile them all into a file to be rendered server side and 'use'd
 - TODO: inline sass variable (same as the todo in the sass above)
 - TODO: png fallback

## Sprites

 - TODO: Build into the SASS flow - currently it spits out it's own css file and png sprite
 - TODO: pull this out the main compiling flow, it's slow (gut feeling haven't checked)

## General

 - Hot reloading: using webpack-dev-server, port is set in webpack.config.js
 - TODO: local proxy
 - TODO: configure linting to standards we all agree on

## Editor plugins

For VS Code:

 - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) will underline code formatting issues so you can catch them without relying on the command line output.
 - [Style Lint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) same for Sass.
 - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) Will the size of the js you import and warn when it's getting too big.


## Introduction

_Skeletor_ is a directory structure and Gulpfile designed as an easy starting point for front end development of projects. Mainly it was developed for projects at Delphic Digital, but it was designed to be agnostic, so any project is capable of using it. It is designed to give you a quick and organized way to start developing web apps with best practices in mind.

### Preface
We gathered our best practices and what works best for our type of projects into a bunch of code to kick off projects.

### Get started

See [The Fednet](https://fednet.herokuapp.com/skeletor/introduction).


#### Disclaimer
This project gets updated as more best practices or discoveries are implemented.
