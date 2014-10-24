//Creating a delphic namespace for all our site code
;(function (DELPHIC, $, MQ) {
	DELPHIC.ver = '0.1.0+build20141024145030';

	mediaQueries = [{
		context: 'mobile',
		match: function() {},
		unmatch: function() {}
	}],

	features = {};


	if (DEBUG) {
		// define console wrapper functions if applicable
		var debug = {};
		debug.log = function(){};
		debug.error = debug.log;
		if (window.console && window.console.log) {
			if (!window.console.error) window.console.error = window.console.log;
			debug.log = function(msg) { window.console.log(msg); };
			debug.error = function(msg,err) { window.console.error(msg,err); };
		}
		DELPHIC.debug = debug;
	}

	features.init = function() {

		MQ.init(mediaQueries);

		var features = document.body.getAttribute("data-feature");

		if(features) {
			featuresArray = features.split(' ');
			for(var i = 0; i < featuresArray.length; i++) {
				var func = featuresArray[i];

				if(this[func] && typeof this[func].init === 'function') {

					var f = this[func],
					    s = (f.settings)?f.settings:undefined;

					if(s && s.context){
						//DEBUG && debug.log(s);
						MQ.addQuery({
							args: f,
							context: s.context,
							call_for_each_context: false,
							match: function(f){f.settings.deps ? DELPHIC.inject(f.settings.deps,f.init) : f.init()},
							unmatch: function(f){(typeof f.clean === 'function' ? f.clean() : undefined)}
						});
					}else{
						(s && s.deps) ? DELPHIC.inject(s.deps,f.init) : f.init();
					}
				}
			}
		}
	}

	//Example features

	features.myFirstFeature = {
		settings: {
			deps: ['delphic.myplugin', 'delphic.myplugincss']
		},
		init: function() {
			DEBUG && debug.log('//////////// First plugin loaded!');
		}
	}

	features.mySecondFeature = {
		settings: {
			context: ['tablet','desktop'],
			deps: ['delphic.myotherplugin']
		},
		init: function() {
			DEBUG && debug.log('/////////// Second plugin loaded!');
		},
		clean: function(){}
	}

	features.init();


} (DELPHIC = window.DELPHIC || {}, $, MQ));
