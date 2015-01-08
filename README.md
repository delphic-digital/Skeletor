FED Responsive Boilerplate
===============

Front End Developer boilerplate. Loosly based off of [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) with Delphic customization.

## Features

* [Normalize.css](https://github.com/necolas/normalize.css).
* [onMediaQuery](https://github.com/JoshBarr/on-media-query) for responsive development.
* [LABjs (Loading And Blocking JavaScript)](https://github.com/getify/LABjs) performance script loader with [custom Delphic wrapper and config](https://github.com/delphic-digital/delphic-jsload).

## Description of files

### JavaScript

* __js/main.js__ Contains all the site JavaScript application code. ALL JavaScript application code should go into this one file for performance and maintainability. See documentation on this file _(coming soon)_.

* __js/lib/delphic.jsload.js__ Wrapper function for LABjs. This is included by default because page specific JavaScripts should be loaded on demand.

* __js/plugins/*__ Put any JavaScript plugins in here to be used asynchronously and on demand with the dd-jsloader.

### CSS / SCSS

As with all Delphic projects, we follow the [mobile first](http://www.html5rocks.com/en/mobile/responsivedesign/) mantra.

* __css/__ This is where our compiled SCSS files will live as well as plugin css files (see comment below).

* __css/plugins/*__ Put any css file in here that correspond to the js/plugins you have added to the site. These css files can be loaded on demand. See the main.js documention _(coming soon)_.

## How to use it


### Building
When your site is ready for production, you can run some grunt commands.

A standard build will:

* Combine and minify normalize.css and main.css into one file. 
* Minify medium.css  
* Minify wide.css
* Combine and minify onmediaquery.js, LAB.js,delphic.jsload.js and main.js into one file.  
* Files are created in the same directory and named *.min.css or *.min.js

```
grunt dev
```

```
grunt prod
```


## Notes

Refer to the [Delphic FED Bible](http://delphic-digital.github.io/).
