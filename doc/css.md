## How to use CSS in Skeletor

Skeletor comes with Sass and a structure setup. See the comments in each partial for more detailed explanations. Also, some sass helper libraries and plugins are preinstalled:
* [Susy](http://susy.oddbird.net), great for robust grids
* [Bourbon](http://bourbon.io), awesome set of mixins
* [Breakpoint](http://breakpoint-sass.com), used with a custom mixin to make breakpoints easy
* [Sass CSS Importer Plugin](https://github.com/chriseppstein/sass-css-importer), helps with importing vanilla css
* [Sass Globbing Plugin](https://github.com/chriseppstein/sass-globbing), so you don't have to add custom partials to the main.scss

### Brief overview of structure

Inside ```partials```

 * ```_settings.scss``` site settings defined here, see comments in partial.
 * ```base``` holds global and base styles.
 * ```components``` holds site components styles.
 * ```layout``` holds global layout styles.
 * ```pages``` holds any page specific styles (try and stick to components instead).
 * ```utilites``` holds mixins and SASS utilites.

#### Overview of best practices for writing SASS/CSS with Skeletor

 * [Mobile First](http://www.zell-weekeat.com/how-to-write-mobile-first-css), mobile first approach
 * [SMACSS](https://smacss.com), css design process
 * [BEM](https://css-tricks.com/bem-101), naming convention for CSS.

Check out these practices in an example component here for guidance: [```src/scss/partials/components/navigation/_main.scss```](src/scss/partials/components/navigation/_main.scss/).
