define(['jquery','velocity'],function($, Velocity) {

	return {

		init: function() {
			document.body.style.backgroundColor = '#2b2836';
			Velocity($("body"),{ opacity: 0.5 },{delay: 1000});
		},

		destroy: function() {}

	};

});
