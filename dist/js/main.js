webpackJsonp([1],[,function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.default={init:function(){a(".js-hello").html("hello")},iReturnTrue:function(){return!0}}}).call(b,c(0))},,function(a,b,c){a.exports=c(4)},function(a,b,c){"use strict";(function(a){function b(a){return a&&a.__esModule?a:{default:a}}var d=c(1),e=b(d),f=c(5),g=b(f);a(document).ready(function(){g.default.init(),e.default.init(),console.log("yo!")})}).call(b,c(0))},function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0});var d=c(6),e=function(a){return a&&a.__esModule?a:{default:a}}(d),f={$flip:a(".js-flip"),$fastFlip:a(".js-flip--fast"),$slowFlip:a(".js-flip--slow")};b.default={init:function(){(0,e.default)(f.$fastFlip),(0,e.default)(f.$fastFlip,{speed:"fast"}),(0,e.default)(f.$slowFlip,{speed:"slow"})}}}).call(b,c(0))},function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.default=function(b,c){var d=Object.assign({},{speed:"default"},c);"fast"==d.speed&&b.addClass("flip--fast"),"slow"==d.speed&&b.addClass("flip--slow"),b.click(function(){a(this).toggleClass("flipped")})}}).call(b,c(0))}],[3]);