import $ from 'jquery';
import NavigationDrawer from '../../lib/skeletor/skeletor.navigation-drawer';

class SampleCommonComponent {

	constructor(){
		this.init();
	}

	init(){
		var nav = new NavigationDrawer($('p'),{option3: 10});
		nav.init();
	//	console.log('init sample shared component')
	}
}

export default SampleCommonComponent;
