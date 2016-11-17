import polyfills  from './lib/polyfills';
import { logger } from './lib/utils/index';

import * as common from './components/common/index';


//TODO: Get all components on the page and init them.


class SkeletorSite{

	constructor() {
		this.initPolyfills();
		this.initCommonComponents();
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
}

new SkeletorSite();
