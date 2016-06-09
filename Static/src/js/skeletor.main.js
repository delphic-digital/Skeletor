// Automatically injected Bower JS dependencies via bowerRequireJS
require.config({
	paths: {
	},
	packages: [

	],
	shim: {

	}
});

//Need a second config so the optimizer doesn't try and evaluate the browser only jquery conditional.

require.config({
	paths: {
		'jquery': (document.addEventListener) ?
			['//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min']
			:
			['//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min']// https://github.com/rnsloan/requirejs-conditionally-load-jquery2
	}
})

require([
	'delphic.loader',
	'delphic.browserupdate',   // http://browser-update.org/
	'svg4everybody',           // https://github.com/jonathantneal/svg4everybody
	'picturefill',             // https://github.com/scottjehl/picturefill
	'./components/common'
], function (
	loader,
	browserupdate,
	svg4everybody,
	picturefill,
	commonComponents
){
	svg4everybody();
	browserupdate.init();
	loader.init();

	commonComponents.init();
});
