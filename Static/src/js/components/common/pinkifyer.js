define(['moment'],function(moment) {

	return {

		init: function() {
			document.body.style.backgroundColor = 'pink';
			document.body.innerHTML= moment().format('MMMM Do YYYY, h:mm:ss a');
		},

		destroy: function() {}

	};

});