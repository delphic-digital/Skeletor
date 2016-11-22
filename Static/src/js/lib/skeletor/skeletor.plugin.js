import $ from 'jquery';
import skeletor from './skeletor.core';

class SkeletorPlugin extends HTMLElement {

	constructor(element, options){
		super();
		this.NAME = this.constructor.name;
		this.UUID = skeletor.getYoDigits(6, this.NAME);
		this.$element = $(this) || $(document);
		this.options = options;

		//Store plugin on element for later retrievel
		if(!this.$element.data('skeletorComponent')){ this.$element.data('skeletorComponent', this); }

		//Store UUID with Skeletor
		skeletor.registerInstance(this.UUID);
	}

	//web component v1 spec: Fired when custom element is added to DOM.
	connectedCallback() {
		this.init();
	};

	init(){
		console.log('connected:',this);
	}

	//Define custom element element here
	static register(elementName){
		skeletor.registerComponent(this, this.ELEMENT_NAME);
	}

	info() { console.log(this); }

	set defaults(value){ this.options = $.extend(true, {}, value, this.options); }
}

export default SkeletorPlugin;
