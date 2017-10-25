import $ from 'jquery';
//note that this is in both the home page and the dark page
import hello from './components/hello.js';
//but this is only used in the dark page (flipper is only on the homepage)
import darkifyer from './components/darkifyer.js';

$(document).ready(function() {
    darkifyer.init();
    hello.init();
});