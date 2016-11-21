import $ from 'jquery';

class Skeletor {
	get VERSION() { return '0.3.0'; }

	constructor(method){
		this._uuids = [];

		//Register a custom jquery selector for skeletor-* components
		$.extend($.expr[':'], {
			skeletor : function(e) {
				return /^skeletor-/i.test(e.tagName);
			}
		});
	}

	jQueryPlugin(method){
		let type = typeof method;
		let pluginInstance = this.data('skeletorPlugin'); //determine the class of plugin

		if(type === 'undefined'){ //needs a parameter passed as a method
			throw new ReferenceError(`We're sorry, you have to pass a method for ${(pluginInstance ? pluginInstance.NAME : 'this element')}.`);

		}else if(type === 'string'){ //an individual method to invoke on a plugin or group of plugins
			var args = Array.prototype.slice.call(arguments, 1);

			//make sure both the class and method exist, skip private methods
			if(pluginInstance !== undefined && method.charAt(0) !== '_' && pluginInstance[method] !== undefined){

				if(this.length === 1){ //if there's only one, call it directly.
					pluginInstance[method].apply(pluginInstance, args);

				}else{

					this.each(function(i, el){ //otherwise loop through the jQuery collection and invoke the method on each
						pluginInstance[method].apply($(el).data('skeletorPlugin'), args);
					});
				}
			}else{ //error for no class or no method
				throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (pluginInstance ? pluginInstance.NAME : 'this element') + '.');
			}
		}else{ //error for invalid argument type
			throw new TypeError(`We're sorry, ${type} type is not a valid parameter. You must use a string representing the method you wish to invoke.`);
		}

		return this;
	}

	registerPlugin(plugin, elementName){

		Object.defineProperty(Skeletor.prototype, plugin.name, {
			get: function() {
				return plugin;
			}
		})

		customElements.define(elementName, plugin);

		console.info(`successfully registered skeletor plugin: ${plugin.name}`)
	}

	registerInstance(value){
		this._uuids.push(value);
	}

}

let skeletor = new Skeletor();

window.Skeletor = skeletor;

$.fn.skeletor = skeletor.jQueryPlugin;

export default skeletor;
