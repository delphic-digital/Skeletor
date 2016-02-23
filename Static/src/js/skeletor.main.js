require.config({
	paths: {
		'utilities' : 'utils/utils',
		'common' : 'components/common',
		'moment' : '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min',   // http://momentjs.com/
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

//Global Components

require(['utilities','common'], function(utils, common){
	common.init();
});