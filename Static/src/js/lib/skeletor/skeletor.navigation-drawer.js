import SkeletorPlugin from './skeletor.plugin';

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
		console.log('init the navigation drawer')
	}

	open(value){
		console.log('open', value)
	}
}

NavigationDrawer.register();

export default NavigationDrawer;
