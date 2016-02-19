define([
	'utils/delphic/delphic.loader',
	'utils/delphic/delphic.browserupdate',  // http://browser-update.org/
	'utils/vendor/svg4everybody',           // https://github.com/jonathantneal/svg4everybody
	'utils/vendor/picturefill'             // https://github.com/scottjehl/picturefill
], function (
	loader,
	browserupdate,
	svg4everybody,
	picturefill
){
	loader.init();
	browserupdate.init();
	svg4everybody();
});