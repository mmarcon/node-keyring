/** DEPENDENCIES **/
var CONTAINER = {};

CONTAINER.fs            = require('fs');
CONTAINER.path          = require('path');
CONTAINER.winston       = require('winston');
CONTAINER.constants     = require('./lib/constants');
CONTAINER.uutils        = require('./lib/usefulutils')(CONTAINER);
CONTAINER.init          = require('./lib/init')(CONTAINER);
CONTAINER.logger        = require('./lib/logger')(CONTAINER);