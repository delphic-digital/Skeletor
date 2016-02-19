define(['jquery'],function ($) {

	/*
	This replicates the removed jQuery .toggle functions.
	http://api.jquery.com/toggle-event/
	*/

	$.fn.clickToggle = function(a, b) {
		var functions=arguments, iteration=0
		return this.on('click.delphic',function(){
			functions[iteration].apply(this,arguments)
			iteration= (iteration+1) %functions.length
		})
	};

});