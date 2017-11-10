/**
 * This uses promises as a local cache. 
 * call() returns a promise that is saved to one of the cache objects. 
 * If you call the same url the now existing promise will be returned.
 * You can call this multiple times before the api returns, it will still only make one request.
 * You can call this multiple times after the api returns, in that case it will resolve immidiatly.
 * 
 * TODO: warning / cancel http requests made if the current domain is http
 * TODO: Responces are assumed to be JSON. Provide a configuration parameter to allow other types to be expected 
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

		//clear out any double slashes
		let cleanUrl = url.replace(/\/\//g, '/');
		
		fetch(cleanUrl, fetchConfig).then((res) => {
			return res.json();
		}).then((jsonizedRes) => {
			resolve(jsonizedRes);
		}).catch((err) => {
			console.error(`REQUEST FAIL ${cleanUrl}`, err);
			reject(err);
		});
	});
}

/**
 * @param {*} url - Pass in the full url you wish to call, including the protocal
 * @param {*} bustCache - If you pass anything into bust cache, it will bust the cache.
 * @returns {Promise} - Promise object returns data parsed as json
 */
function get(url, bustCache) {

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