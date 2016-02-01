## How to use Skeletor

What it does:

* convert your SCSS files to CSS, concatenate and minify them
	* creates an old IE CSS with stripped out media queries
* watch your JS and reload the browser on change
	* media context based javascript async loading
	* requirejs module structure and async module loading
* watch your CSS and inject the new rules on change
* watch your HTML and reload the browser on change
* provide a server at localhost:3000 and 192.168.my.ip:3000

###The available commands
```sh
# run Grunt in development mode (does not minify your JS for quicker response),
# start the server, open a new browser tab at localhost:3000 and start watching files.
# JS path is updated to src directory in base template
# Sass is automatically compiled, and sprites are automatically generated.
$ grunt
# or
$ grunt dev
```
```sh
# run Grunt in production mode (does minify and runs a requirejs build on your JS),
# JS path is updated to dist directory in base template,
# will not start any server or watch.
$ grunt build
```
