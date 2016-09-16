define(['jquery', 'skeletor.accordion'],function($) {

	return {
		settings: {
			$elm : $('.js-accordion')
		},

		init: function() {
			$('.js-accordion').each(function(){
				new Skeletor.Accordion($(this));
			})
		},

		destroy: function() {
		}

	};

});
