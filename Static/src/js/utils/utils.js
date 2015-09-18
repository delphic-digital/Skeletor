define([
	'utils/delphic.loader',
	'utils/browser-update', /** http://browser-update.org/ **/
	'utils/picturefill', /** https://github.com/scottjehl/picturefill**/
	'utils/onmediaquery', /** https://github.com/JoshBarr/on-media-query **/
	'utils/isMobile', /** https://github.com/kaimallea/isMobile **/
	'utils/delphic.utils' /** Custom delphic utils **/
], function (
	loader
){

	/**
  *   Remove hovers from mobile devices
  */
	if(isMobile.any){
		require(['utils/remove-hover'],function(removeHover){
			removeHover();
		});
	}

	/**
  *   Initialize OnMediaQuery
  */
	MQ.init();

	/**
  *   Initialize Delphics component loader
  */
	loader.init();

});