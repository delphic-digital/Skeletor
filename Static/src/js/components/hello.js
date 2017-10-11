// Simple components can just be in their own named file
import $ from 'jquery';

function init(){
    $('.js-hello').html('hello');
}

export default {
    init
};