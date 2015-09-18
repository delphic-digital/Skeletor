define({
	init: function() {

		//Map out components contexts
		var components = $.map($('[data-component]'), function(el){
			return {context: $(el).data('component-context') || null, name: 'components/'+$(el).data('component')};
		});

		var contexts = this.mergeByContext(components);
		var self = this;

		$.each(contexts, function(i, component){
			if(component.context != 'null'){
				self.addContextQuery(component.context, component.name)
			}else{
				//component does not need a context. i.e, it's initilized on page load no matter the context;
				self.loadComponent(component.name)
			}
		})
	},

	addContextQuery: function(context, components){
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

	loadComponent: function(components){
		var componentsArr = components.split(',');

		require(componentsArr, function(){
			$.each(arguments, function(i, component){
				component.init();
			})
		})
	},

	mergeByContext: function(arr){ //http://stackoverflow.com/questions/19118016/merge-values-of-array-by-duplicate-keys
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