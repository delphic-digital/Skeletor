webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utilities = __webpack_require__(3);

var _utilities2 = _interopRequireDefault(_utilities);

var _hello = __webpack_require__(9);

var _hello2 = _interopRequireDefault(_hello);

var _flipper = __webpack_require__(10);

var _flipper2 = _interopRequireDefault(_flipper);

var _weather = __webpack_require__(12);

var _weather2 = _interopRequireDefault(_weather);

var _egParams = __webpack_require__(15);

var _egParams2 = _interopRequireDefault(_egParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//complex component contained in a folder, just name the folder
_utilities2.default.init(); //simple component in it's oen js file, give it the .js extension


$(document).ready(function () {
	_flipper2.default.init();
	_hello2.default.init();
	_weather2.default.init();
	_egParams2.default.init();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jQuery = __webpack_require__(18);

var _jQuery2 = _interopRequireDefault(_jQuery);

var _svg4everybody = __webpack_require__(7);

var _svg4everybody2 = _interopRequireDefault(_svg4everybody);

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If a utility library needs some global set up configuration, this is the place to do it!
 * You could also import it into an individual component if the lib supports multiple instances (eg new Thing({blah blah blah}))
 */

exports.default = {
	init: function init() {
		_jQuery2.default.init();
		_svg4everybody2.default.init();
	}
};

//some utilities init themselves

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 *
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */

(function(self) {
    'use strict';

    var nativeURLSearchParams = self.URLSearchParams ? self.URLSearchParams : null,
        isSupportObjectConstructor = nativeURLSearchParams && (new nativeURLSearchParams({a: 1})).toString() === 'a=1',
        __URLSearchParams__ = "__URLSearchParams__",
        prototype = URLSearchParamsPolyfill.prototype,
        iterable = !!(self.Symbol && self.Symbol.iterator);

    if (nativeURLSearchParams && isSupportObjectConstructor) {
        return;
    }


    /**
     * Make a URLSearchParams instance
     *
     * @param {object|string|URLSearchParams} search
     * @constructor
     */
    function URLSearchParamsPolyfill(search) {
        search = search || "";

        // support construct object with another URLSearchParams instance
        if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {
            search = search.toString();
        }

        this [__URLSearchParams__] = parseToDict(search);
    }


    /**
     * Appends a specified key/value pair as a new search parameter.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.append = function(name, value) {
        appendTo(this [__URLSearchParams__], name, value);
    };

    /**
     * Deletes the given search parameter, and its associated value,
     * from the list of all search parameters.
     *
     * @param {string} name
     */
    prototype.delete = function(name) {
        delete this [__URLSearchParams__] [name];
    };

    /**
     * Returns the first value associated to the given search parameter.
     *
     * @param {string} name
     * @returns {string|null}
     */
    prototype.get = function(name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict[name][0] : null;
    };

    /**
     * Returns all the values association with a given search parameter.
     *
     * @param {string} name
     * @returns {Array}
     */
    prototype.getAll = function(name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict [name].slice(0) : [];
    };

    /**
     * Returns a Boolean indicating if such a search parameter exists.
     *
     * @param {string} name
     * @returns {boolean}
     */
    prototype.has = function(name) {
        return name in this [__URLSearchParams__];
    };

    /**
     * Sets the value associated to a given search parameter to
     * the given value. If there were several values, delete the
     * others.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.set = function set(name, value) {
        this [__URLSearchParams__][name] = ['' + value];
    };

    /**
     * Returns a string containg a query string suitable for use in a URL.
     *
     * @returns {string}
     */
    prototype.toString = function() {
        var dict = this[__URLSearchParams__], query = [], i, key, name, value;
        for (key in dict) {
            name = encode(key);
            for (i = 0, value = dict[key]; i < value.length; i++) {
                query.push(name + '=' + encode(value[i]));
            }
        }
        return query.join('&');
    };


    /*
     * Apply polifill to global object and append other prototype into it
     */
    self.URLSearchParams = (nativeURLSearchParams && !isSupportObjectConstructor) ?
        new Proxy(nativeURLSearchParams, {
            construct: function(target, args) {
                return new target((new URLSearchParamsPolyfill(args[0]).toString()));
            }
        }) :
        URLSearchParamsPolyfill;


    var USPProto = self.URLSearchParams.prototype;

    USPProto.polyfill = true;

    /**
     *
     * @param {function} callback
     * @param {object} thisArg
     */
    USPProto.forEach = USPProto.forEach || function(callback, thisArg) {
        var dict = parseToDict(this.toString());
        Object.getOwnPropertyNames(dict).forEach(function(name) {
            dict[name].forEach(function(value) {
                callback.call(thisArg, value, name, this);
            }, this);
        }, this);
    };

    /**
     * Sort all name-value pairs
     */
    USPProto.sort = USPProto.sort || function() {
        var dict = parseToDict(this.toString()), keys = [], k, i, j;
        for (k in dict) {
            keys.push(k);
        }
        keys.sort();

        for (i = 0; i < keys.length; i++) {
            this.delete(keys[i]);
        }
        for (i = 0; i < keys.length; i++) {
            var key = keys[i], values = dict[key];
            for (j = 0; j < values.length; j++) {
                this.append(key, values[j]);
            }
        }
    };

    /**
     * Returns an iterator allowing to go through all keys of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.keys = USPProto.keys || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push([name]);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all values of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.values = USPProto.values || function() {
        var items = [];
        this.forEach(function(item) {
            items.push([item]);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all key/value
     * pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.entries = USPProto.entries || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push([name, item]);
        });
        return makeIterator(items);
    };


    if (iterable) {
        USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;
    }


    function encode(str) {
        var replace = {
            '!': '%21',
            "'": '%27',
            '(': '%28',
            ')': '%29',
            '~': '%7E',
            '%20': '+',
            '%00': '\x00'
        };
        return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function(match) {
            return replace[match];
        });
    }

    function decode(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    }

    function makeIterator(arr) {
        var iterator = {
            next: function() {
                var value = arr.shift();
                return {done: value === undefined, value: value};
            }
        };

        if (iterable) {
            iterator[self.Symbol.iterator] = function() {
                return iterator;
            };
        }

        return iterator;
    }

    function parseToDict(search) {
        var dict = {};

        if (typeof search === "object") {
            for (var i in search) {
                if (search.hasOwnProperty(i)) {
                    var str = typeof search [i] === 'string' ? search [i] : JSON.stringify(search [i]);
                    appendTo(dict, i, str);
                }
            }

        } else {
            // remove first '?'
            if (search.indexOf("?") === 0) {
                search = search.slice(1);
            }

            var pairs = search.split("&");
            for (var j = 0; j < pairs.length; j++) {
                var value = pairs [j],
                    index = value.indexOf('=');

                if (-1 < index) {
                    appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));

                } else {
                    if (value) {
                        appendTo(dict, decode(value), '');
                    }
                }
            }
        }

        return dict;
    }

    function appendTo(dict, name, value) {
        if (name in dict) {
            dict[name].push('' + value);
        } else {
            dict[name] = ['' + value];
        }
    }

})(typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _svg4everybody = __webpack_require__(8);

var _svg4everybody2 = _interopRequireDefault(_svg4everybody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import svg4everybody from 'svg4everybody/dist/svg4everybody.legacy.js'; //if you need the legacy version

exports.default = {
	init: function init() {
		//find init options detailed in the repo: https://github.com/jonathantneal/svg4everybody
		(0, _svg4everybody2.default)();
	}
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(root, factory) {
     true ? // AMD. Register as an anonymous module unless amdModuleId is set
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return root.svg4everybody = factory();
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                xhr._embeds.push({
                                    parent: parent,
                                    svg: svg,
                                    id: id
                                }), // prepare the xhr ready state change event
                                loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// Simple components can just be in their own named file

function init() {
	$('.js-hello').html('hello');
}

function iReturnTrue() {
	return true;
}

exports.default = {
	init: init, iReturnTrue: iReturnTrue
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _flipOnClick = __webpack_require__(11);

var _flipOnClick2 = _interopRequireDefault(_flipOnClick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = {}; //Complex components that would benefit from larg chuncks of functionality being broken out into their own files 
//should live in their oen folder with the index.js file being the point of contact for anything outside


function init() {
	settings = {
		$flip: $('.js-flip'),
		$fastFlip: $('.js-flip--fast'),
		$slowFlip: $('.js-flip--slow')
	};

	(0, _flipOnClick2.default)(settings.$fastFlip);
	(0, _flipOnClick2.default)(settings.$fastFlip, { speed: 'fast' });
	(0, _flipOnClick2.default)(settings.$slowFlip, { speed: 'slow' });
}

//you don't have to export the split out code directly, you can do stuff with it in here too.
exports.default = {
	init: init
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = flipOnClick;
// import $ from 'jquery';

function flipOnClick($elm, overrides) {
	var defaults = {
		speed: 'default'
	};

	var options = Object.assign({}, defaults, overrides);

	if (options.speed == 'fast') {
		$elm.addClass('flip--fast');
	}

	if (options.speed == 'slow') {
		$elm.addClass('flip--slow');
	}

	$elm.click(function () {
		$(this).toggleClass('flipped');
	});
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _weatherData = __webpack_require__(13);

var _weatherData2 = _interopRequireDefault(_weatherData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
	_weatherData2.default.getCurrent('Philadelphia').then(function (data) {
		console.log('current weather: ', data);
	}).catch(function (err) {
		console.error('weather service returned an error', err);
	});
}

exports.default = {
	init: init
};

// function(){
// 	function bomb(){
// 		var detonator = {};
// 		return detonator.boom();
// 	}

// 	try {
// 		bomb();
// 	} catch (e) {
// 		// throw new Error('boom', e);
// 		throw new Error(`This is an example error to demo error handling: ${e.message}`);
// 	}
// }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _api = __webpack_require__(14);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrent(cityName) {
	return new Promise(function (resolve, reject) {
		_api2.default.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName).then(function (data) {
			if (data.code == 401) {
				console.error('API says Nope');
				//reject or resolve silently  so the UI doesn't break
				resolve({ nothingToSee: 'Move along' });
			}
			resolve(data);
		}).catch(function (err) {
			//reject or resolve silently so the UI doesn't break
			resolve({ nothingToSee: 'Move along' });
			reject(err);
		});
	});
}

exports.default = {
	getCurrent: getCurrent
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Use this to make api calls!
 * 
 * TODO: warning / cancel http requests made if the current domain is http
 * TODO: Responces are assumed to be JSON. Provide a configuration parameter to allow other types to be expected, eg:
 * TODO: turn api into a class & save the domain so further calls only need to add the path. 
 *       let amazingDataApi = new Api('https://amazingdata.com/');
 *       amazingDataApi.get('amazing-things')
 *           .then( ...
 *  
api.get(https://your-fancy-api.com/?givemedata=allthedata)
	.then((data) => {
		//we've got data!
	}).catch((err) => {
		//ohh dear. 
	});
*/

var getCaches = {};

function call(url, fetchConfig) {

	return new Promise(function (resolve, reject) {
		//TODO check between http and https

		fetch(url, fetchConfig).then(function (res) {
			return res.json();
		}).then(function (jsonizedRes) {
			resolve(jsonizedRes);
		}).catch(function (err) {
			console.error('REQUEST FAIL ' + url, err);
			reject(err);
		});
	});
}

/**
 * All get requests are cached by default (as a promise saved to the getCaches object using the url as the key).
 * You can call this multiple times before the api returns, it will still only make one request and all calls to it will resolve when that one http request resolves. Nifty!
 * You can call this multiple times after the api returns, in that case it will resolve immidiatly and not make any further requests. Unless you pass anything in as the second parameter
 * @param {*} url - Pass in the full url you wish to call, including the protocal
 * @param {*} bustCache - If you pass anything into bust cache, it will bust the cache.
 * @returns {Promise} - Promise object returns data parsed as json
 */
function get(url, bustCache) {
	if ((typeof bustCache === 'undefined' ? 'undefined' : _typeof(bustCache)) === 'object') {
		//this may happen when get is mistakenly used in place of post or it's assumed there are configuration options. TODO: make those configuration options
		console.warn('bustCache is usually a boolean, got object: ', bustCache);
	}

	if (typeof getCaches[url] == 'undefined' || typeof bustCache !== 'undefined') {
		getCaches[url] = call(url, { method: 'GET' });
	}

	return getCaches[url];
}

/**
 * Post requests are not cached
 * @param {*} url - Again the full url with protocal 
 * @param {*} data - Pass in the data you wish to send
 * @returns {Promise} - Promise object returns data parsed as json
 */
function post(url, data) {
	return call(url, { method: 'POST', body: data });
}

exports.default = {
	get: get, post: post
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Handling url parameters with https://www.npmjs.com/package/url-search-params-polyfill
 * 
 */

function init() {
	if (window.location.search === '') {
		//push some examples on 
		var _exampleParams = new URLSearchParams({
			'for': 'example'
		}); //you can init with a string, an object, and more! Read that link
		window.location.search = _exampleParams.toString(); //will cause a refresh
		return;
	}

	//if we do have some params to play with
	var exampleParams = new URLSearchParams(window.location.search);
	console.log('The params we loaded with: ', exampleParams.toString());

	exampleParams.set('fun', 'times!');
	console.log('Adding some more: ', exampleParams.toString());

	window.history.pushState(null, null, '?' + exampleParams.toString()); //will not cause a refresh
}

exports.default = {
	init: init
};

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	init: function init() {
		//make jQuery availble everywhere!
		window.$ = _jquery2.default;
	}
};

/***/ })
],[1]);