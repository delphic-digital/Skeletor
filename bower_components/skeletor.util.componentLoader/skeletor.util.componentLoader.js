/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */


define(['jquery', 'skeletor.core', 'onMediaQuery'],function($, Skeletor, MQ){

	function ComponentLoader(element, options) {
		ComponentLoader.__super__.call(this, element, options, ComponentLoader.DEFAULTS);
	}

	ComponentLoader.VERSION = '0.2.0';
	ComponentLoader.DEFAULTS =  {}

	Skeletor.Plugin.create(ComponentLoader, {
		_init: function(element) {
			var _this = this;
			var components = $.map($('[data-component]'), function(el){
				return {context: $(el).data('component-context') || null, name: 'components/'+$(el).data('component')};
			});
			var contexts = this._mergeByContext(components);

			$.each(contexts, function(i, component){
				if(component.context != 'null'){
					_this._addContextQuery(component.context, component.name)
				}else{
					//component does not need a context. i.e, it's initilized on page load no matter the context;
					_this._loadComponent(component.name)
				}
			})
		},
		_addContextQuery: function(context, components){
			var contextArr = context.split(','),
			    componentsArr = components.split(',');

			MQ.addQuery({
				context: contextArr,
				call_for_each_context: false,
				match: function(){
					require(componentsArr, function(){
						$.each(arguments, function(i, component){
							component.init();
						})
					},function (err) {
						var failedId = err.requireModules && err.requireModules[0];
						console.error(failedId + ' couldn\'t be found! Does the file exist?')
					})
				},
				unmatch: function(){
					$.each(componentsArr, function(i, component){
						var component = require(component);
						if (typeof component.destroy === 'function'){ component.destroy() };
					})
				}
			});
		},
		_loadComponent: function(components){
			var componentsArr = components.split(',');

			require(componentsArr, function(){
				$.each(arguments, function(i, component){
					component.init();
				})
			},function (err) {
				var failedId = err.requireModules && err.requireModules[0];
				console.error(failedId + ' couldn\'t be found! Does the file exist?')
			})
		},
		_mergeByContext: function(arr){ //http://stackoverflow.com/questions/19118016/merge-values-of-array-by-duplicate-keys
			var temp = {};
			for (var i=0; i<arr.length; i++) {
				temp[arr[i].context] = temp[arr[i].context] === undefined ? arr[i].name : temp[arr[i].context]+','+arr[i].name;
			}
			arr = [];
			for (var key in temp) {
				arr.push({context: key, name:temp[key]})
			}
			return arr;
		}
	});

	new ComponentLoader()

});