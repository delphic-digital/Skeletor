import SkeletorPlugin from './skeletor.plugin';

class Guy extends SkeletorPlugin {

	constructor(element, options){
		super(element, options);

		this.VERSION = '0.1.0';

		this.defaults = {}
	}

	init(){
		super.init();
	}

	static get ELEMENT_NAME() {
		return "skeletor-guy";
	}
}

export default Guy;
