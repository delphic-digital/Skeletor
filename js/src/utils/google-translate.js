define(function(){

	var initGoogleTranslate = function() {
		new google.translate.TranslateElement({
			pageLanguage: 'en',
			autoDisplay: true,
			layout: google.translate.TranslateElement.InlineLayout.SIMPLE
		}, 'google_translate_element');
	}

	window.initGoogleTranslate = initGoogleTranslate;

	require(['//translate.google.com/translate_a/element.js?cb=initGoogleTranslate'])
})