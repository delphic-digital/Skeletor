// Automatically injected Bower JS dependencies via bowerRequireJS
require.config({
	paths: {
		onMediaQuery: "../../../bower_components/onMediaQuery/js/onmediaquery",
		picturefill: "../../../bower_components/picturefill/dist/picturefill",
		"skeletor.util.componentLoader": "../../../bower_components/skeletor.util.componentLoader/skeletor.util.componentLoader",
		"skeletor.core": "../../../bower_components/skeletor.core/skeletor.core",
		svg4everybody: "../../../bower_components/svg4everybody/dist/svg4everybody"
	},
	packages: [

	],
	shim: {

	}
});
// endbower

//Need a second config so the optimizer doesn't try and evaluate the browser only jquery conditional.

require.config({
	paths: {
		'jquery': (document.addEventListener) ?
			['//code.jquery.com/jquery-3.0.0.min']
			:
			['//code.jquery.com/jquery-1.12.4.min'] // https://github.com/rnsloan/requirejs-conditionally-load-jquery2
	}
})

define(function (require){

	var componentLoader   = require('skeletor.util.componentLoader'),
	    svg4everybody     = require('svg4everybody'),
	    picturefill       = require('picturefill'),
	    commonComponents  = require('./components/common');

	svg4everybody();
	commonComponents.init();

});
