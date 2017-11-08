import SkeletError from '../services/SkeletError.js';

export default function(){
	function bomb(){
		var detonator = {};
		return detonator.boom();
	}

	try {
		bomb();
	} catch (e) {
		// throw new Error('boom', e);
		throw new SkeletError(`This is an example error to demo error handling: ${e.message}`);
	}
}