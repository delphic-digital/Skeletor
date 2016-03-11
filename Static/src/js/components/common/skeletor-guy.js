define(['jquery'],function($) {

	return {
		settings: {
			$elm : $('.js-skeletor-guy')
		},

		init: function() {
			var _ = this;
			console.log('init skeletor guy.')

			_.settings.$elm.click(function(){
				$(this).toggleClass('flipped')
			})
		},

		destroy: function() {
			console.log('destroy skeletor guy, please no.')
		}

	};

});