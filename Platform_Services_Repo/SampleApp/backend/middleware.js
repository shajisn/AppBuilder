/**
 * Created by Jithu.jose on 3/7/2016.
 */

var express = require('express');
var path = require('path');
var config = require(path.resolve('backend/config'));
var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(express.static(path.join(config.root, 'frontend')));
    app.set('views', path.join(config.root, 'frontend/views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(bodyParser.json());
};

