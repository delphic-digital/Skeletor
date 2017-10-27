// Simple components can just be in their own named file
// import $ from 'jquery';
// import Velocity from 'velocity-animate';

function init(){
	document.body.style.backgroundColor = '#2b2836';
	Velocity($('body'),{ opacity: 0.5 },{delay: 1000});
}

export default {
	init
};