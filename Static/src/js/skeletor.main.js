// Automatically injected Bower JS dependencies via bowerRequireJS
require.config({
	paths: {
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
			['//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min']
			:
			['//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min'] // https://github.com/rnsloan/requirejs-conditionally-load-jquery2
	}
})

define(function (require){

	var componentLoader   = require('skeletor.util.componentLoader'),
	    browsehappy       = require('skeletor.browsehappy'),
	    svg4everybody     = require('svg4everybody'),
	    picturefill       = require('picturefill'),
	    commonComponents  = require('./components/common/index');

	svg4everybody();
	commonComponents.init();

});
