'use strict';
var skeletorConfig = require('./skeletor.config.js');

//https://hackernoon.com/easy-progressive-web-metrics-9afa5ed857c2
//https://www.npmjs.com/package/pwmetrics

module.exports = {
	url: skeletorConfig.liveUrl,
	expectations: {
		ttfmp: {
			warn: '>=500',
			error: '>=1000'
		},
		ttfcp: {
			warn: '>=500',
			error: '>=1000'
		}
	}
};
