import $ from 'jquery';

//Needs a shim to workaround es6 code this transpiled to es5 for web components v1
//https://github.com/webcomponents/custom-elements#user-content-known-issues

/*class SkeletorGuy extends HTMLElement {

	constructor() {

		//initialize state, setup event listeners, or creating shadow dom
		super();
		this.addEventListener('click', e => {
			this.toggle();
		});
	}

	// Fires when an instance of the element is created.
	connectedCallback() {
		//run setup code, such as fetching resources or rendering
		console.log('created skeletor-guy');
	};

	disconnectedCallback() {
		//run cleanup code
		console.log('removed skeletor-guy')
	};

	toggle(){
		console.log('toggle guy')
	}

}

customElements.define("skeletor-guy", SkeletorGuy);
*/
