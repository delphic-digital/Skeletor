// https://www.sitepoint.com/proper-error-handling-javascript/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#ES6_Custom_Error_Class
// Pretty sure this can be improved further - anyone feel free to jump in!
//TODO: better stack trace, currently it just comes out as a string. Would be awesome to have the line breaks work and click to sources in chrome dev tools 
class SkeletError extends Error {
	constructor(message, ...params) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params);

		// Maintains proper stack trace for where our error was thrown
		Error.captureStackTrace(this, SkeletError);
		
		// Custom debugging information
		this.message = message;
		this.date = new Date();
		this.skeleStack = (new Error()).stack;
	}
	// this.name = 'SkeletError';
	// this.message = message || '';
}

export default SkeletError;


/* For example:

//this will throw an error
function bomb(){
	var detonator = {};
	return detonator.boom();
}

//Do the risky thing, and add to any errors that come out for maximum usefulness!
try {
	bomb();
} catch (e) {
	throw new SkeletError(e.message);
}
*/