require.config({
	paths: {
		'async': 'lib/requirejs-plugins/src/async',
		'utilities' : 'utils/utils',
		'common' : 'components/common',
		'moment' : '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min',   // http://momentjs.com/
		'jquerycookie': '//cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min', // https://github.com/carhartl/jquery-cookie
		'storage' : '//cdn.jsdelivr.net/jquery.storage-api/1.7.2/jquery.storageapi.min', // https://github.com/julien-maurel/jQuery-Storage
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

require(['utilities','common'], function(utils,common){

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