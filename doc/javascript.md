## How to use JavaScript in Skeletor

Skeletor comes with JavaScript structure using [RequireJS](http://requirejs.org). See the comments in each JS for more detailed explanations. Some JS helper libraries and plugins are included:

* [jQuery](https://jquery.com), version 2 is automatically loaded for browers that support it, otherwise the 1.9 branch is used.
* [Browser Update](http://browser-update.org), tell your audience to use modern browsers!
* [isMobile](https://github.com/kaimallea/isMobile), only if you REALLY need it, typically you should be doing [feature detetection](https://learn.jquery.com/code-organization/feature-browser-detection).
* [onMediaQuery](https://github.com/JoshBarr/on-media-query), works great for triggering javascript for certain media queries.
* [Picturefill](https://github.com/scottjehl/picturefill), there is no reason to not use reponsive images.

### Brief overview of structure

* Inside ```components``` will be your sites custom requirejs modules.
	* ```common``` folder contains components that are global and be concatenated to the main.js when built.
	* ```mobile``` folder contains components that are mobile specific and will be contacted to a mobile.js and be only loaded on mobile with onMediaQuery
	* other components will be standalone and won't be concatenated with the main (common) JS. These can be loaded directly with the HTML.
* Inside ```lib``` are the require.js library files
* Inside ```plugins``` should be any vendor or 3rd party (jQuery plugins) JavaScript dependencies for components.
* Inside ```utils``` should be any global vendor or 3rd party JavaScript like polyfills or helpers.


### data-component and date-component-context
To load a JS component, use the sample syntax in ```component-example.js```, and add a data-component to the html element that should load the JS.

```HTML
<!-- component-example.js will be loaded anytime this HTML is present on the page -->
<div class="component-example" data-component="component-example">
	Lorem ipsum
</div>
```

To load a JS component for only certain media queries, add a data-component-context to the html element. For multiple states, comma separate the values. The values should match the setup values for onMediaQuery. See [```/Static/src/scss/partials/base/_scaffolding.scss```](/Static/src/scss/partials/base/_scaffolding.scss).

```HTML
<!-- component-example.js will be loaded only in tablet and desktop -->
<div class="component-example" data-component="component-example" data-component-context="tablet,desktop">
	Lorem ipsum
</div>
```