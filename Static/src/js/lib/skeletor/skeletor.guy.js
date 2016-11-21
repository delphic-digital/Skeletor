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
}

//register with skeletor framework and create the element
Guy.register("skeletor-guy");


export default Guy;
