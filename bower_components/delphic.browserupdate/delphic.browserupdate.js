//http://browser-update.org/

define([],function () {
	return {
		init: function(){
			window.$buoop = {
				url: "http://browsehappy.com/"
			};
			require(['//browser-update.org/update.min.js'])
		}
	}
});
