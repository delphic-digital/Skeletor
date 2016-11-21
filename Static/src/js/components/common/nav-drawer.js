import $ from 'jquery';
import NavigationDrawer from '../../lib/skeletor/skeletor.navigation-drawer';

class MyNavDrawer extends NavigationDrawer{

	constructor(){
		super();
	}

	init(){
		super.init();
		this.setAttribute('shared','');
	}
}

MyNavDrawer.register(MyNavDrawer.ELEMENT_NAME);

export default MyNavDrawer;
