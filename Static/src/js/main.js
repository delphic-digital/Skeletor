import $ from 'jquery';
import polyfills  from './lib/polyfills';
import { logger } from './lib/utils/index';
import './lib/skeletor/skeletor.core';

import * as common from './components/common/index';

//Needs a shim to workaround es6 code this transpiled to es5 for web components v1
//https://github.com/webcomponents/custom-elements#user-content-known-issues

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
		//Get custom elements on page that start with skeletor-

		/* we need a `__moduleName` here to support relative urls. Spec is still incoming:

		https://github.com/systemjs/systemjs/blob/master/docs/module-formats.md#es6
		https://github.com/systemjs/systemjs/issues/1185#issuecomment-210865981

		*/

		$(':skeletor').not('[shared]').each((i, elm)=>{
			let moduleName = $(elm).prop("tagName").toLowerCase();
			System.import('./components/'+moduleName, __moduleName).then( (module) => {
				//console.log(module)
			})
		})
	}
}

new SkeletorSite();
