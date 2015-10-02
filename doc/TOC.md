FED Documentation
===============


## Requirements (Windows PC)

Items needed to be installed before using the boilerplate and all it's awesomeness:

1. [Ruby](http://rubyinstaller.org/) 
2. [Ruby DevKit](http://rubyinstaller.org/add-ons/devkit/)
3. [NodeJS](https://nodejs.org/en/)
3. [Sass](http://sass-lang.com/install)
4. [Hologram Gem](http://trulia.github.io/hologram/)


## Get Up and Running 

1. Clone the repo and rename the directory to the appropriate project name
2. From the Command Line, navigate to the root of your project's directory
3. Enter the command: `npm install`, this will download and install all the dependecies (defined in package.json) into the "node_modules" folder
4. Run the command: `grunt dev`, this will do a few things: 
  * Set the project into "dev" mode. When in "dev", your project will use files from the `Static/src` folders. 
  * Start BrowserSync.
  * Runs the "watch" task in Grunt, which watches for SCSS, Sprite, and Styleguide changes.


