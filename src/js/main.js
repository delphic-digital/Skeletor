import $ from 'jquery';
import hello from './components/hello.js'; //simple component in it's oen js file, give it the .js extension
import flipper from './components/flipper'; //complex component contained in a folder, just name the folder
import errorExample from './components/errorExample.js';

//jQuery everywhere!
window.$ = $;

//Global error listener, use services/SkeletError to throw better errors
window.addEventListener('error', function (e) {
	var error = e.error;
	console.log(error, e);
});

//here's an example of SkeletError in action!
errorExample();


$(document).ready(function() {
	flipper.init();
	hello.init();
});
