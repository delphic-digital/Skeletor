// Automatically injected Bower JS dependencies via bowerRequireJS
require.config({
	paths: {
		"delphic.browserupdate": "../../../bower_components/delphic.browserupdate/delphic.browserupdate",
		"delphic.loader": "../../../bower_components/delphic.loader/delphic.loader",
		onMediaQuery: "../../../bower_components/onMediaQuery/js/onmediaquery",
		picturefill: "../../../bower_components/picturefill/dist/picturefill",
		svg4everybody: "../../../bower_components/svg4everybody/dist/svg4everybody"
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

define(function (require){

	var loader           = require('delphic.loader'),
	    browserupdate    = require('delphic.browserupdate'),
	    svg4everybody    = require('svg4everybody'),
	    picturefill      = require('picturefill'),
	    commonComponent  = require('./components/common');
	
	svg4everybody();
	browserupdate.init();
	loader.init();
	commonComponents.init();

});
