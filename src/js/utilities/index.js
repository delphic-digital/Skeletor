import jquery from './jquery-3.3.1.slim.js';
window.$ = jquery;

import svg4everybody from './svg4everybody.js';

export default {
	init: function(){
		window.LEGACY_SUPPORT = false;
		svg4everybody()
	}
};
