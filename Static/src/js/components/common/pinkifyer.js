define(['moment'],function(moment) {

	return {

		init: function() {
			document.body.style.backgroundColor = 'pink';
			console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
		},

		destroy: function() {}

	};

});