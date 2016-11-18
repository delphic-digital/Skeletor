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
		super.init();
	}

	open(value){
		console.log('open', value)
	}
}

//register with skeletor framework and create the element
NavigationDrawer.register("skeletor-nav-drawer");


export default NavigationDrawer;
