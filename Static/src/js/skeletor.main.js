//Requirejs confif

require.config({
	paths: {
			//https://github.com/rnsloan/requirejs-conditionally-load-jquery2
		 "jquery": (document.addEventListener) ?
		 	['//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min','jquery-2.0.2.min']
		 	:
		 	['//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min','jquery-1.10.1.min']
	}
});

require(['jquery','utils/utils','components/common'], function($, utils, common){

	console.log('jQuery version: '+$.fn.jquery)

	/**
	 *  Init mobile only components with onMediaQuery and all common (global) components
	 */

	MQ.addQuery({
		context: 'mobile',
		match: function() {
			require(['components/mobile'], function(component){
				component.init();
			})
		},
		unmatch: function() {
			require('components/mobile').destroy(); //http://requirejs.org/docs/api.html#modulenotes-console
		}
	});

	common.init();

});