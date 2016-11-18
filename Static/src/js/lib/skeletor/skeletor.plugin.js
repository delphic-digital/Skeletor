import $ from 'jquery';
import skeletor from './skeletor.core';

class SkeletorPlugin extends HTMLElement {

	constructor(element, options){
		super();
		this.NAME = this.constructor.name;
		this.UUID = SkeletorPlugin.getYoDigits(6, this.constructor.name)
		this.$element = $(this) || $(document);
		this.options = options;

		//Store plugin on element for later retrievel
		if(!this.$element.data('skeletorPlugin')){ this.$element.data('skeletorPlugin', this); }

		//Store UUID with Skeletor
		skeletor.registerInstance(this.UUID);
	}

	//web component v1 spec
	connectedCallback() {
		this.init();
	};

	init(){
		console.log('connected:',this);
	}

	static register(elementName){
		skeletor.registerPlugin(this, elementName);
	}

	static getYoDigits(length, namespace) {
		length = length || 6;
		return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
	}

	info() { console.log(this); }

	set defaults(value){ this.options = $.extend(true, {}, value, this.options); }
}

export default SkeletorPlugin;
