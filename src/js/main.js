import $ from 'jquery';
import hello from './components/hello.js'; //simple component in it's oen js file, give it the .js extension
import flipper from './components/flipper'; //complex component contained in a folder, just name the folder
import weather from './components/weather.js';

//jQuery everywhere!
window.$ = $;

$(document).ready(function() {
	flipper.init();
	hello.init();
	weather.init();

	//included in the vendor bundle (look at the vendors array in /build_tasks/webpack.js) 
	//Allows you to <use> external svgs with support for IE 9, 10, and 11.
	window.svg4everybody();
});
