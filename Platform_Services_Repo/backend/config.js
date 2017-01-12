/**
 * Created by Jithu.jose on 1/28/2016.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

var ERRORS = {
    EMPTY_URL_IN_TEMPLATE: 'Empty url configured in template',
    INVALID_METHOD: 'Invalid Method'
};

module.exports = {
    root: rootPath,
    port: 9400,
    ERRORS: ERRORS
};