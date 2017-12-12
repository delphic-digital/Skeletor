/**
 * Handling url parameters with https://www.npmjs.com/package/url-search-params-polyfill
 * 
 */

function init(){
	if (window.location.search === '') {
		//push some examples on 
		let exampleParams = new URLSearchParams({
			'for': 'example'
		}); //you can init with a string, an object, and more! Read that link
		window.location.search = exampleParams.toString(); //will cause a refresh
		return;
	}

	//if we do have some params to play with
	let exampleParams = new URLSearchParams(window.location.search);
	console.log('The params we loaded with: ', exampleParams.toString());

	exampleParams.set('fun','times!');
	console.log('Adding some more: ', exampleParams.toString());
	
	window.history.pushState(null, null, '?' + exampleParams.toString()); //will not cause a refresh
}

export default {
	init
};