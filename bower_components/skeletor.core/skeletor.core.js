/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

define(['jquery'],function ($){

	// Global Skeletor object

	var Skeletor = {
		VERSION: '0.2.2',
		_plugins: {},
		_uuids: [],
		Plugin: Plugin
	};

	//The skeletor jquery plugin
	//Thanks to Zurbs Foundation for their hardwork on this pattern

	var skeletor = function(method) {
		var type = typeof method;

		if(type === 'undefined'){ //needs a parameter passed as a method
			throw new ReferenceError("We're sorry, you have to pass a method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');

		}else if(type === 'string'){ //an individual method to invoke on a plugin or group of plugins

			var args = Array.prototype.slice.call(arguments, 1),
			    plugClass = this.data('skeletorPlugin'); //determine the class of plugin

			//make sure both the class and method exist, skip private methods
			if(plugClass !== undefined && method.charAt(0) !== '_' && plugClass[method] !== undefined){

				if(this.length === 1){ //if there's only one, call it directly.
					plugClass[method].apply(plugClass, args);

				}else{

					this.each(function(i, el){ //otherwise loop through the jQuery collection and invoke the method on each
						plugClass[method].apply($(el).data('skeletorPlugin'), args);
					});
				}
			}else{ //error for no class or no method
				throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
			}
		}else{ //error for invalid argument type
				throw new TypeError("We're sorry," + type + "is not a valid parameter. You must use a string representing the method you wish to invoke.");
			}
		return this;
	}

	/**
	 * Plugin base constructor
	 */

	function Plugin(element, options, defaultOptions) {
		this.options = $.extend(true, {}, defaultOptions, options);
		this.$element = element || $(document);

		if (typeof this._init !== 'function') {
			throw this.name + ' needs an _init method';
		}

		//Store plugin attributes in Skeletor
		var pluginName = functionName(this.constructor).toLowerCase();
		this.uuid = GetYoDigits(6, pluginName);
		Skeletor._uuids.push(this.uuid);
		if(!this.$element.data('skeletorPlugin')){ this.$element.data('skeletorPlugin', this); }

		this._init(element);
	}

	/**
	 * Plugin trigger function attached to base
	 */

	 Plugin.prototype._trigger = function(eventName, data) {
	 	eventName in this.options && this.options[eventName].call(this, $.Event(this.name + ':' + eventName, {bubbles: false}), data);
	};

	/**
	 * Plugin create function that inherits off of base
	 */

	Plugin.create = function(SubConstructor, prototype) {

		//Set plugin base to __super__ property of plugin
		SubConstructor.__super__ = Plugin;

		//Inherit base properties
		for (var key in Plugin.prototype) {
			if (!SubConstructor.prototype[key]) {
				SubConstructor.prototype[key] = Plugin.prototype[key];
			}
		}

		SubConstructor.prototype = $.extend(true, SubConstructor.prototype, prototype);

		SubConstructor.prototype.constructor = SubConstructor;
		SubConstructor.prototype.name = functionName(SubConstructor);

		var className = SubConstructor.prototype.name;
		var attrName  = hyphenate(className);

		// Add to the Skeletor object and the plugins list
		Skeletor._plugins[attrName] = Skeletor[className] = SubConstructor;

	}

	//UTILS

	function functionName(fn) {
		if (Function.prototype.name === undefined) {
			var funcNameRegex = /function\s([^(]{1,})\(/;
			var results = (funcNameRegex).exec((fn).toString());
			return (results && results.length > 1) ? results[1].trim() : "";
		}
		else if (fn.prototype === undefined) {
			return fn.constructor.name;
		}
		else {
			return fn.prototype.constructor.name;
		}
	}

	// Convert PascalCase to kebab-case
	// Thank you: http://stackoverflow.com/a/8955580
	function hyphenate(str) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	function GetYoDigits(length, namespace) {
		length = length || 6;
		return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
	}


	window.Skeletor = Skeletor;
	$.fn.skeletor = skeletor;

	return Skeletor;
});
