/**
 * This uses promises as a local cache. 
 * call() returns a promise that is saved to one of the cache objects. 
 * If you call the same url the now existing promise will be returned.
 * You can call this multiple times before the api returns, it will still only make one request.
 * You can call this multiple times after the api returns, in that case it will resolve immidiatly.
 * 
 * TODO: warning / cancel http requests made if the current domain is http
 * TODO: local cache busting param if requests do actually need to make another request
 * TODO: post requests getting cached... probably not a good idea
 * TODO: post data into post request
 * TODO: any other types other than json? Should probably add some override configuration
 *  
api.get(https://your-fancy-api.com/?givemedata=allthedata)
	.then((data) => {
		//we've got data!
	}).catch((err) => {
		//ohh dear. 
	});
*/

let getCaches = {},
	postCaches = {};

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

function get(url) {

	if (typeof getCaches[url] == 'undefined') {
		getCaches[url] = call(url, {method: 'GET'});
	}

	return getCaches[url];
}

function post(url) {

	if (typeof postCaches[url] == 'undefined') {
		postCaches[url] = call(url, {method: 'POST'});
	}

	return postCaches[url];
}


export default {
	get, post
};