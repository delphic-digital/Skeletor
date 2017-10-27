//Complex components that would benefit from larg chuncks of functionality being broken out into their own files 
//should live in their oen folder with the index.js file being the point of contact for anything outside
// import $ from 'jquery';
import flipOnClick from './flipOnClick.js';

const settings = {
	$flip : $('.js-flip'),
	$fastFlip : $('.js-flip--fast'),
	$slowFlip : $('.js-flip--slow')
};

function init(){
	flipOnClick(settings.$fastFlip);
	flipOnClick(settings.$fastFlip, {speed: 'fast'});
	flipOnClick(settings.$slowFlip, {speed: 'slow'});
}

//you don't have to export the split out code directly, you can do stuff with it in here too.
export default {
	init
};