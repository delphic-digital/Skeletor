/** @license
 * RequireJS plugin for loading JSON files
 * - depends on Text plugin and it was HEAVILY "inspired" by it as well.
 * Author: Miller Medeiros
 * Version: 0.4.0 (2014/04/10)
 * Released under the MIT license
 */

define(["text"],function(text){function cacheBust(e){return e=e.replace(CACHE_BUST_FLAG,""),e+=e.indexOf("?")<0?"?":"&",e+CACHE_BUST_QUERY_PARAM+"="+Math.round(2147483647*Math.random())}var CACHE_BUST_QUERY_PARAM="bust",CACHE_BUST_FLAG="!bust",jsonParse=typeof JSON!="undefined"&&typeof JSON.parse=="function"?JSON.parse:function(val){return eval("("+val+")")},buildMap={};return{load:function(e,t,n,r){r.isBuild&&(r.inlineJSON===!1||e.indexOf(CACHE_BUST_QUERY_PARAM+"=")!==-1)||t.toUrl(e).indexOf("empty:")===0?n(null):text.get(t.toUrl(e),function(t){var i;if(r.isBuild)buildMap[e]=t,n(t);else{try{i=jsonParse(t)}catch(s){n.error(s)}n(i)}},n.error,{accept:"application/json"})},normalize:function(e,t){return e.indexOf(CACHE_BUST_FLAG)!==-1&&(e=cacheBust(e)),t(e)},write:function(e,t,n){if(t in buildMap){var r=buildMap[t];n('define("'+e+"!"+t+'", function(){ return '+r+";});\n")}}}});