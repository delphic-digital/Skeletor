'use strict';

var inliner = require('./node_modules/sass-inline-svg');

module.exports = {
  'svg': inliner('./Static/src/sprites/vectors', {optimize: true})
};
