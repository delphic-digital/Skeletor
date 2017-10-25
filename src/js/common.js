// import $ from 'jquery';
import hello from './components/hello.js'; //simple component in it's oen js file, give it the .js extension
import flipper from './components/flipper'; //complex component contained in a folder, just name the folder

$(document).ready(function() {
    flipper.init();
    hello.init();
    console.log('yo!');
});