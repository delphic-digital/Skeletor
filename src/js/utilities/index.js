import jQuery from './jQuery.js';
import svg4everybody from './svg4everybody.js';

//some utilities init themselves
import './URLSearchParams.js';

/**
 * If a utility library needs some global set up configuration, this is the place to do it!
 * You could also import it into an individual component if the lib supports multiple instances (eg new Thing({blah blah blah}))
 */

export default {
	init: function(){
		jQuery.init();
		svg4everybody.init();
	}
};
