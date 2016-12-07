//Example skeletor plugin that registers a custom element

import Accordion from 'skeletor-plugin-accordion';

class MyAccordion extends Accordion{

	constructor(){
		super();
	}

	init(){
		super.init();
		//this.setAttribute('shared','');
	}
}

export default MyAccordion;
