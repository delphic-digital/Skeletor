define('components/common/darkifyer',[],function() {

	return {

		init: function() {
			document.body.style.backgroundColor = '#2b2836';
		},

		destroy: function() {}

	};

});

define('components/common',['./common/darkifyer'], function() {

	return {
		args: arguments,
		init: function() {
			var _ = this,
			    components =  _.args;

			for (var i in components) {
				var component = components[i];
				typeof component.init == 'function' ? component.init() : null;
			}
		},
		destroy: function() {
			var _ = this,
			    components =  _.args;

			for (var i in components) {
				var component = components[i];
				typeof component.destroy == 'function' ? component.destroy() : null;
			}
		}
	};

});

