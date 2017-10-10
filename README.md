# The Webpack version of Skeletor

 - svg
    - compile them all into a file to be rendered server side and 'use'd
    - inline sass variable
    - png fallback
 - sprite sheets
 - hot reloading / local proxy
 - configure linting to standards we all agree on

 - ES6: write modern JS!
 - Hot reloading: using webpack-dev-server, port is set in webpack.config.js
 - TODO: get code splitting working, possibly with the data-component pattern, look into it 
 - PNG spriting: put your png files in src/sprite_png 
    - it'll spit them out along with utility classes in dist/sprite
    - TODO: set up a base64 inline scss version
 - SVG spriting:
    - TODO: get this working properly, should be close
 - [Sass-lint](https://github.com/sasstools/sass-lint) (not scss-lint), there's a [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint)
 - [ESLint](https://eslint.org/), also there's a [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). This is hooked up to webpack so you'll see it shouting at you in the console.

## Introduction

_Skeletor_ is a directory structure and Gulpfile designed as an easy starting point for front end development of projects. Mainly it was developed for projects at Delphic Digital, but it was designed to be agnostic, so any project is capable of using it. It is designed to give you a quick and organized way to start developing web apps with best practices in mind.

### Preface
We gathered our best practices and what works best for our type of projects into a bunch of code to kick off projects.

### Get started

See [The Fednet](https://fednet.herokuapp.com/skeletor/introduction).


#### Disclaimer
This project gets updated as more best practices or discoveries are implemented.
