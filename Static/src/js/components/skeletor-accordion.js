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

MyAccordion.register();

export default MyAccordion;
