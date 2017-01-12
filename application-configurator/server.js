/**
 * Created by Jithu.jose on 1/28/2016.
 */
var express = require('express');
var app = express();
var path = require('path');
require(path.resolve('backend/database/configureMongoose'));

var middleware = require(path.resolve('backend/middleware'))(app);
var router = require(path.resolve('backend/routes'))(app);
var config = require(path.resolve('backend/config'));
var GLOBAL = {};
app.listen(config.port);
console.log('Server listening on port : ', config.port);

module.exports = app;