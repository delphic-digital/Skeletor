// Simple components can just be in their own named file

function init(){
	$('.js-hello').html('hello');
}

function iReturnTrue(){
		return true;
}

export default {
	init, iReturnTrue
};