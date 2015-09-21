define('components/mobile/main-menu',[],function() {

	return {

		init: function() {
			console.log('init mobile menu')
		},

		destroy: function() {
			console.log('destroy mobile menu')
		}

	};

});
define('components/mobile',['./mobile/main-menu'],function() {

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
