import SkeletorPlugin from './skeletor.plugin';

//TODO: Build out nav drawer skeletor component
class NavigationDrawer extends SkeletorPlugin {

	constructor(element, options){
		super(element, options);

		this.VERSION = '0.1.0';

		this.defaults = {
			optionOne: true,
			optionTwo: false
		}
	}

	init(){
		super.init();
	}

	open(value){
		console.log('open', value)
	}

	static get ELEMENT_NAME() {
		return "skeletor-nav-drawer";
	}
}

export default NavigationDrawer;
