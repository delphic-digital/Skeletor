import $ from 'jquery';
import polyfills  from './lib/polyfills';
import { logger } from './lib/utils/index';
import './lib/skeletor/skeletor.core';

import * as common from './components/common/index';

//TODO: Get all components on the page and init them.


class SkeletorSite{

	constructor() {
		this.initPolyfills();
		this.initCommonComponents();
		//this.initPageComponents();
	}

	initPolyfills(){
		polyfills();
	}

	initCommonComponents(){
		for (var key of Object.keys(common)) {
			let component = common[key];
			new component();
		}
	}

	initPageComponents(){
		$(':skeletor').each((i, elm)=>{
			let moduleName = $(elm).prop("tagName").toLowerCase();
			console.log(moduleName);
			System.import('./components/'+moduleName, __moduleName).then( (module) => {
				//console.log(module)
			})
		})

		//Get custom elements on page that start with skeletor-

		/* we need a `__moduleName` here to support relative urls. Spec is still incoming:

		https://github.com/systemjs/systemjs/blob/master/docs/module-formats.md#es6
		https://github.com/systemjs/systemjs/issues/1185#issuecomment-210865981

		*/

		/*System.import('./components/'+moduleName, __moduleName).then( CatModule => {
			let myCat = new CatModule.Cat('babu');
			this.setState({cat: myCat.meow()});
		})*/
	}
}

new SkeletorSite();
