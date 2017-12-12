/**
 * Use this to make api calls!
 * 
 * TODO: warning / cancel http requests made if the current domain is http
 * TODO: Responces are assumed to be JSON. Provide a configuration parameter to allow other types to be expected, eg:
 * TODO: turn api into a class & save the domain so further calls only need to add the path. 
 *       let amazingDataApi = new Api('https://amazingdata.com/');
 *       amazingDataApi.get('amazing-things')
 *           .then( ...
 *  
api.get(https://your-fancy-api.com/?givemedata=allthedata)
	.then((data) => {
		//we've got data!
	}).catch((err) => {
		//ohh dear. 
	});
*/

let getCaches = {};

function call(url, fetchConfig){

	return new Promise((resolve, reject) => {
		//TODO check between http and https
		
		fetch(url, fetchConfig).then((res) => {
			return res.json();
		}).then((jsonizedRes) => {
			resolve(jsonizedRes);
		}).catch((err) => {
			console.error(`REQUEST FAIL ${url}`, err);
			reject(err);
		});
	});
}

/**
 * All get requests are cached by default (as a promise saved to the getCaches object using the url as the key).
 * You can call this multiple times before the api returns, it will still only make one request and all calls to it will resolve when that one http request resolves. Nifty!
 * You can call this multiple times after the api returns, in that case it will resolve immidiatly and not make any further requests. Unless you pass anything in as the second parameter
 * @param {*} url - Pass in the full url you wish to call, including the protocal
 * @param {*} bustCache - If you pass anything into bust cache, it will bust the cache.
 * @returns {Promise} - Promise object returns data parsed as json
 */
function get(url, bustCache) {
	if (typeof bustCache === 'object') {
		//this may happen when get is mistakenly used in place of post or it's assumed there are configuration options. TODO: make those configuration options
		console.warn('bustCache is usually a boolean, got object: ', bustCache);
	}

	if (typeof getCaches[url] == 'undefined' || typeof bustCache !== 'undefined') {
		getCaches[url] = call(url, {method: 'GET'});
	}

	return getCaches[url];
}

/**
 * Post requests are not cached
 * @param {*} url - Again the full url with protocal 
 * @param {*} data - Pass in the data you wish to send
 * @returns {Promise} - Promise object returns data parsed as json
 */
function post(url, data) {
	return call(url, {method: 'POST', body: data});
}

export default {
	get, post
};
