import weatherData from '../services/weatherData.js';

function init(){
	weatherData.getCurrent('Philadelphia').then((data) => {
		console.log('current weather: ', data);
	}).catch((err) => {
		console.error('weather service returned an error', err);
	});
}

export default {
	init
};

// function(){
// 	function bomb(){
// 		var detonator = {};
// 		return detonator.boom();
// 	}

// 	try {
// 		bomb();
// 	} catch (e) {
// 		// throw new Error('boom', e);
// 		throw new Error(`This is an example error to demo error handling: ${e.message}`);
// 	}
// }