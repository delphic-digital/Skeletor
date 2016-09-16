/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

define(['jquery', 'velocity', 'skeletor.core'],function ($, Velocity, Skeletor){

	function Accordion(element, options) {
		Accordion.__super__.call(this, element, options, Accordion.DEFAULTS);
	}

	Accordion.VERSION = '0.2.0';
	Accordion.DEFAULTS =  {
		active: 0,
		collapsible: true,
		singleOpen: true,
		duration: 200,
		easing: 'swing'
	}

	Skeletor.Plugin.create(Accordion, {
		$items: [],
		$headers: [],
		$sections: [],
		_init: function() {

			this.$element.attr({
				'role':'tablist',
				'aria-multiselectable': true
			});

			this.$items  = this.$element.find('.accordion__item'),
			this.$headers  = this.$element.find('.accordion__header'),
			this.$sections = this.$element.find('.accordion__section');

			this.$items.first().attr({
				"tabindex": "0"
			})

			this._setAriaLabels();
			this._bindEvents();
			this.show(this.options.active)
		},

		_setAriaLabels: function(){
			var self = this;

			this.$headers.each(function(index){
				$(this).attr({
					"role": "tab",
					"aria-controls": self.uuid+"-section",
					"aria-expanded": "false",
					"aria-selected": "false"
				});
			});

			this.$sections.each(function(index){
				$(this).attr({
					"role": "tabpanel",
					"labelledby": self.uuid+"-section",
					"aria-hidden": "true"
				});
			});

		},

		_bindEvents: function() {
			var self = this;

			this.$headers.on('click.skeletor.accordion', function(e){
				var $item = $(this).closest('.accordion__item');
				self._toggle($item);
			});

			this.$items.on('keydown.skeletor.accordion', function(e){
				var $item = $(this).closest('.accordion__item'),
				    index = $item.index();

				if(e.keyCode == 13){
					//ENTER => toggle tab
					self._toggle($item);
				} else if (( e.keyCode == 37 || e.keyCode == 38 ) && !e.ctrlKey ) {
					// UP or LEFT => previous tab
					if(index==0){
						self.$items.last().focus();
					}else{
						$item.prev().focus();
					}
				} else if (( e.keyCode == 40 || e.keyCode == 39 ) && !e.ctrlKey) {
					// DOWN or RIGHT => next tab
					if(index==self.$items.length-1){
						self.$items.first().focus();
					}else{
						$item.next().focus();
					}
				}
			})

			this.$items.on('focus.skeletor.accordion', function(e){
				self.$items.attr({
					"tabindex": "-1"
				});
			});

			this.$items.on('blur.skeletor.accordion', function(e){
				self.$items.first().attr({
					"tabindex": "0"
				});
			});
		},

		_toggle: function($item){
				var isOtherSectionsOpen = $item.siblings('.accordion__item--opened').length>0,
				    canClose = true;

				if(!isOtherSectionsOpen && !this.options.collapsible){
					canClose = false;
				}

				$item.focus();

				if($item.hasClass('accordion__item--opened')){
					if(canClose){
						this.close($item)
					}
				}else{
					this.open($item)
				}

				//this[($item.hasClass('accordion__item--opened')) ? (function(){if(canClose){return 'close'}})() : 'open']($item);
		},

		_getItemByIndex: function(item){
			if (typeof item === 'number') {
				item = this.$items.eq(item);
			}
			return item;
		},

		open: function($item){
			$item = this._getItemByIndex($item);

			var $header = $item.find('.accordion__header'),
			    $section = $item.find('.accordion__section');

			if (this.options.singleOpen) {
				this.closeAll();
			}

			Velocity
				.animate($section, 'slideDown', {
					begin: function() {},
					duration: this.options.duration,
					easing: this.options.easing,
					complete: function() {
						$item
							.addClass('accordion__item--opened');
						$header
							.attr({
								"aria-expanded": "true"
							});
						$section
							.attr({
								"aria-hidden": "false",
							});
					}
				});
		},

		close: function($item){
			$item = this._getItemByIndex($item);

			var $header = $item.find('.accordion__header'),
			    $section = $item.find('.accordion__section');

			Velocity
				.animate($section, 'slideUp', {
					begin: function() {},
					duration: this.options.duration,
					easing: this.options.easing,
					complete: function() {
						$item
							.removeClass('accordion__item--opened');
						$header
							.attr({
								"aria-expanded": "false"
							});
						$section
							.attr({
								"aria-hidden": "true",
							});
					}
				});
		},

		show: function($item){
			$item = this._getItemByIndex($item);

			var $header = $item.find('.accordion__header'),
			    $section = $item.find('.accordion__section');

			if (this.options.singleOpen) {
				this.hideAll();
			}

			$item
				.addClass('accordion__item--opened');
			$header
				.attr({
					"aria-expanded": "true"
				});
			$section
			  .show()
				.attr({
					"aria-hidden": "false",
				});
		},

		hide: function($item){
			$item = this._getItemByIndex($item);

			var $header = $item.find('.accordion__header'),
			    $section = $item.find('.accordion__section');

			$item
				.addClass('accordion__item--opened');
			$header
				.attr({
					"aria-expanded": "true"
				});
			$section
			  .hide()
				.attr({
					"aria-hidden": "false",
				});
		},

		closeAll: function() {
			var self = this;
			this.$element.find('.accordion__item--opened').each(function() {
				self.close($(this));
			});
		},

		hideAll: function() {
			var self = this;
			this.$element.find('.accordion__item--opened').each(function() {
				self.hide($(this));
			});
		},
	});

});
