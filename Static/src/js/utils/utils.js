define([
	'utils/delphic.loader',
	'utils/svg4everybody',
	'utils/browser-update', /** http://browser-update.org/ **/
	'utils/picturefill', /** https://github.com/scottjehl/picturefill**/
	'utils/onmediaquery', /** https://github.com/JoshBarr/on-media-query **/
	'utils/isMobile', /** https://github.com/kaimallea/isMobile **/
	'utils/delphic.utils' /** Custom delphic utils **/
], function (
	loader
){

	svg4everybody();

	/**
  *   Initialize OnMediaQuery
  */
	MQ.init();

	/**
  *   Initialize Delphics component loader
  */
	loader.init();

});