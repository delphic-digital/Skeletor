import $ from 'jquery';

class Skeletor {
	//TODO: Document skeletor core methods

	get VERSION() { return '0.3.0'; }

	constructor(method){
		this._uuids = [];

		this.setSelector();
	}

	jQueryPlugin(method){
		let type = typeof method;
		let pluginInstance = this.data('skeletorComponent'); //determine the class of plugin

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
						pluginInstance[method].apply($(el).data('skeletorComponent'), args);
					});
				}
			}else{ //error for no class or no method
				throw new ReferenceError(`We're sorry, ${ method} is not an available method for ${(pluginInstance ? pluginInstance.NAME : 'this element')}.`);
			}
		}else{ //error for invalid argument type
			throw new TypeError(`We're sorry, ${type} type is not a valid parameter. You must use a string representing the method you wish to invoke.`);
		}

		return this;
	}

	registerComponent(plugin, elementName){

		Object.defineProperty(Skeletor.prototype, plugin.name, {
			get: function() {
				return plugin;
			}
		})

		window.customElements.define(elementName, plugin);

		console.info(`successfully registered skeletor plugin: ${plugin.name}`)
	}

	registerComponentInstance(value){
		this._uuids.push(value);
	}

	getYoDigits(length, namespace) {
		length = length || 6;
		return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
	}

	setSelector(){
		//Register a custom jquery selector for skeletor-* elements
		$.extend($.expr[':'], {
			skeletor : function(e) {
				return /^skeletor-/i.test(e.tagName);
			}
		});
	}

}

let skeletor = new Skeletor();

window.Skeletor = skeletor;

$.fn.skeletor = skeletor.jQueryPlugin;

export default skeletor;
