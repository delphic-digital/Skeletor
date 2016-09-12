define(['jquery'],function($) {

	return {
		settings: {
			$elm : $('.js-skeletor-guy')
		},

		init: function() {
			console.log('init skeletor guy.')

			this.settings.$elm.click(function(){
				$(this).toggleClass('flipped')
			})
		},

		destroy: function() {
			console.log('destroy skeletor guy, please no.')
		}

	};

});
