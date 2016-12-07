'use strict';

var jspmImporter = require('../node_modules/sass-jspm-importer/src/importer');
var magicImporter = require('../node_modules/node-sass-magic-importer/dist/cli');

module.exports = [jspmImporter, magicImporter];
