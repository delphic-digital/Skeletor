'use strict';

// Automatically injected Bower JS dependencies via bowerRequireJS
require.config({
	paths: {
		onMediaQuery: "../../../bower_components/onMediaQuery/js/onmediaquery",
		picturefill: "../../../bower_components/picturefill/dist/picturefill",
		"skeletor.util.componentLoader": "../../../bower_components/skeletor.util.componentLoader/skeletor.util.componentLoader",
		"skeletor.core": "../../../bower_components/skeletor.core/skeletor.core",
		svg4everybody: "../../../bower_components/svg4everybody/dist/svg4everybody",
		"include-fragment-element": "../../../bower_components/include-fragment-element/include-fragment-element",
		webcomponentsjs: "../../../bower_components/webcomponentsjs/webcomponents-lite"
	},
	packages: [

	],
	shim: {
		"skeletor.util.componentLoader": {
			deps: [
				"skeletor.core"
			]
		},"include-fragment-element": {
			deps: [
				"webcomponentsjs"
			]
		}
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

	var include           = require('include-fragment-element'),
	    componentLoader   = require('skeletor.util.componentLoader'),
	    svg4everybody     = require('svg4everybody'),
	    picturefill       = require('picturefill'),
	    commonComponents  = require('./components/common');

	svg4everybody();
	commonComponents.init();

});
