import api from '../utilities/api.js';

function getCurrent(cityName){
	return new Promise((resolve, reject) => {
		api.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}`).then((data) => {
			if (data.cod == 401) {
				console.error('API says Nope');
				//reject or resolve silently  so the UI doesn't break
				resolve({nothingToSee: 'Move along'});
			}
			resolve(data);
		}).catch((err) => {
			//reject or resolve silently so the UI doesn't break
			resolve({nothingToSee: 'Move along'});
			reject(err);
		});
	});
}

export default {
	getCurrent
};
