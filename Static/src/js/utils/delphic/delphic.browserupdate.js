//http://browser-update.org/

define([],function (storage) {
	return {
		init: function(){
			window.$buoop = {
				url: "http://browsehappy.com/"
			};
			require(['//browser-update.org/update.min.js'])
		}
	}
});