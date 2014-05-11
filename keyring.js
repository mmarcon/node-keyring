/** DEPENDENCIES **/
var KEYRING = {};

KEYRING.fs            = require('fs');
KEYRING.path          = require('path');
KEYRING.crypto        = require('crypto');
KEYRING.winston       = require('winston');
KEYRING.constants     = require('./lib/constants');
KEYRING.json          = require('./lib/json');
KEYRING.uutils        = require('./lib/usefulutils')(KEYRING);
KEYRING.init          = require('./lib/init')(KEYRING);
KEYRING.logger        = require('./lib/logger')(KEYRING);
KEYRING.API           = require('./lib/api')(KEYRING);

module.exports = KEYRING.API;