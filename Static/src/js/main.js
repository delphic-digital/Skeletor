import $ from 'jquery';
import polyfills  from './lib/polyfills';
//import { logger } from './lib/utils/index';
import skeletor from 'skeletor-core';

import * as common from './components/common/index';

//Needs a shim to workaround es6 code this transpiled to es5 for web components v1
//https://github.com/webcomponents/custom-elements#user-content-known-issues

//https://developers.google.com/web/fundamentals/getting-started/primers/customelements

class SkeletorSite{

	constructor() {
		this.initPolyfills();
		this.initCommonComponents();
		this.initPageComponents();
	}

	initPolyfills(){
		polyfills();
	}

	initCommonComponents(){
		for (var key of Object.keys(common)) {
			let component = common[key];
			//new component();
		}
	}

	initPageComponents(){
		//Get custom elements on page that start with skeletor- and have async attribute

		/* we need a `__moduleName` here to support relative urls. Spec is still incoming:

		https://github.com/systemjs/systemjs/blob/master/docs/module-formats.md#es6
		https://github.com/systemjs/systemjs/issues/1185#issuecomment-210865981

		*/

		//NOTE: Load modules async or bundle together?
		//TODO: Use one promise for all: http://exploringjs.com/es6/ch_modules.html#_loader-method-importing-modules

		$(':skeletor[async]').each((i, elm)=>{
			let moduleName = $(elm).prop("tagName").toLowerCase();
			SystemJS.import('./components/'+moduleName, __moduleName).then( (module) => {
				/*
				This load Skeletor custom elements and corresponding JS.
				Custom elements component are automatically initialized when DOM element is seen
				*/

				//Register custom element.
				//module.default is the plugin default export
				module.default.register();
			})
		})
	}
}

new SkeletorSite();
