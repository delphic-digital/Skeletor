//Complex components that would benefit from larg chuncks of functionality being broken out into their own files 
//should live in their oen folder with the index.js file being the point of contact for anything outside
import $ from 'jquery';
import flipper from './filpper.js';

const settings = {
    $elm : $('.js-skeletor-guy')
};

function init(){
    console.log('index init!');
    flipper.flipInit(settings.$elm);
}

//you don't have to export the split out code directly, you can do stuff with it in here too.
export default {
    init
};