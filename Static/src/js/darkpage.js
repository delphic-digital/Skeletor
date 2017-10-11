import $ from 'jquery';
import hello from './components/hello.js'; //note that this is in both the home page and the dark page
import darkifyer from './components/darkifyer.js'; //but this is only used in the dark page (flipper is only on the homepage)

$(document).ready(function() {
    darkifyer.init();
    hello.init();
});