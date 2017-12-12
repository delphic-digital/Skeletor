import utils from './utilities';

import hello from './components/hello.js'; //simple component in it's oen js file, give it the .js extension
import flipper from './components/flipper'; //complex component contained in a folder, just name the folder
import weather from './components/weather.js';
import egParams from './components/egParams.js';

utils.init();

$(document).ready(function() {
	flipper.init();
	hello.init();
	weather.init();
	egParams.init();
});
