import $ from 'jquery';
import darkifyer from './components/darkifyer.js'; //simple component in it's oen js file, give it the .js extension
import skeletorGuy from './components/skeletorGuy'; //complex component contained in a folder, just name the folder

$(document).ready(function() {
    console.log('ready!');
    darkifyer.init();
    skeletorGuy.init();
});