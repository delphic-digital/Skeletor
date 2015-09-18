define(function() {

	return {
		args: arguments,
		init: function() {
			$.each(this.args, function(i, component){
				component.init();
			})
		},
		destroy: function() {
			$.each(this.args, function(i, component){
				component.destroy();
			})
		}
	};

});