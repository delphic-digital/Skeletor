define(['jquery', 'utils/vendor/onmediaquery'],function ($, MQ) {

	MQ.init();

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

	return MQ;

});