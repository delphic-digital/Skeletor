## How to use CSS in Skeletor

Skeletor comes with Sass and a structure setup. See the comments in each partial for more detailed explanations. Also, some sass helper libraries and plugins are preinstalled:
* [Susy](http://susy.oddbird.net), great for robust grids
* [Bourbon](http://bourbon.io), awesome set of mixins
* [Breakpoint](http://breakpoint-sass.com), used with a custom mixin to make breakpoints easy
* [Sass CSS Importer Plugin](https://github.com/chriseppstein/sass-css-importer), helps with importing vanilla css
* [Sass Globbing Plugin](https://github.com/chriseppstein/sass-globbing), so you don't have to add custom partials to the main.scss

### Brief overview of structure

Inside ```partials```

 * ```_settings.scss``` site settings defined here, so comments in partial.
 * ```base``` holds global and base styles.
 * ```components``` holds site components styles.
 * ```layout``` holds global layout styles.
 * ```pages``` holds any page specific styles (try and stick to components instead).
 * ```utilites``` holds mixins and SASS utilites.