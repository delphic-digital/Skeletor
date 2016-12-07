//Example skeletor plugin that registers a custom element

import $ from 'jquery';
import SkeletorPlugin from 'skeletor-plugin-base';

class SkeletorGuy extends SkeletorPlugin{

	constructor(element, options){
		super(element, options);

		this.VERSION = '0.1.0';

		this.defaults = {}
	}

	init(){
		super.init();
	}

	click(){
		console.log('click')
	}

	//Required prop!

	static get ELEMENT_NAME() {
		return "skeletor-guy";
	}
}

export default SkeletorGuy;
