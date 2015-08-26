/* ==========================================================
 *
 * Delphic.ace.js
 * Version: 3.0.0 (Thurs, 9 Apr 2015)
 * Delphic Digital
 *
 * ========================================================== */


//https://developers.google.com/analytics/devguides/collection/analyticsjs/events#implementation
//https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
//http://www.comicvine.com/ace-the-bat-hound/4005-31302/

(function(DELPHIC, $) {
	"use strict";

	function Ace(selector,options) {
		this.init(selector,options);
	}

	Ace.prototype = {
		init: function(selector,options){
			this.attach(selector,options);
		},

		attach: function(selector, options){
			var self = this;
			if(typeof selector === 'object'){
				$(selector).on('click.ace', function(e){
					self.eventClick(options,this)
				});
			}else if(typeof selector === 'string'){
				$(document).on('click.ace', selector , function(e){
					self.eventClick(options,this)
				});
			}

		},

		eventClick: function(options, target){
			var self = this;
			var $target = $(target),
				    data = self.getData(options, $target);

			self.push(data, $target);
		},

		getData: function(options, $target){
			var data;
			if($target){
				data = options || $target.data("track-event");
			}else{
				data=options;
			}

			data = data.split(",");

			for (var i in data) {
				if (data.hasOwnProperty(i)) {
					data[i] = $.trim(data[i]);
				}
			}
			return data;
		},

		push: function(data, $target){

			//category, action, label, value, noninteraction, $target
			var url;

			if($target) {
				url = $target.attr("href");
			}else{
				url = '';
			}

			var category = data[0],
			    action = data[1],
			    label = data[2] || url,
			    value = data[3],
			    noninteraction = data[4];


			if (typeof window.ga === "function") {
				var event = {
					"hitType": "event",
					"location": String(window.location),
					"title": String(window.document.title)
				};

				if (category) {
					event["eventCategory"] = category;
				}

				if (action) {
					event["eventAction"] = action;
				}

				if (label) {
					event["eventLabel"] = label;
				}

				if (value) {
					event["eventValue"] = value;
				}

				if (noninteraction) {
					event["nonInteraction"] = noninteraction;
				}

				if (typeof $target !== "undefined") {
					var href = (typeof $target[0].href !== "undefined") ? $target[0].href : "",
					    url = (href.indexOf(":") < 0) ? window.location.protocol + "//" + window.location.hostname + "/" + href : href;

					if (href !== "") {
						// Check window target
						if ($target.attr("target")) {
							//window.open(url, $target.attr("target"));
						} else {
							event["hitCallback"] = function() {
							//	document.location = url;
							};
						}
					}
				}

				//console.info(event);

				window.ga("send", event);
			}
		}
	}

	//var myAce = new Ace("*[data-track-event]");
	var myAce = new Ace();

	$.ace = function (options) {
		var data = myAce.getData(options);
		myAce.push(data);
	}

	$.fn.ace = function (options) {
		return this.each(function () {
				myAce.attach(this, options );
		});
	};



} (DELPHIC = window.DELPHIC || {}, window.jQuery));