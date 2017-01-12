/**
 * Created by Jithu.jose on 1/28/2016.
 */
var express = require('express');
var path = require('path');
var config = require(path.resolve('backend/config'));
var bodyParser = require('body-parser');
var publicUrls = [
    '/api/user/getData',
    '/api/user/setData',
    '/api/user/putData',
    '/api/user/deleteData',
    '/assets/country_codes.json'
];
function allowCrossDomain(req, res, next){
    if(publicUrls.indexOf(req.url) !== -1){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization, x-via-device, pragma, accept, cache-control, dmadetails, if-modified-since');
    }
    next();
}

module.exports = function(app){
    app.use(allowCrossDomain);
    app.use(express.static(path.join(config.root, 'frontend')));
    //app.set('views', path.join(config.root, 'frontend/views'));
    //app.engine('html', require('ejs').renderFile);
    //app.set('view engine', 'html');
    app.use(bodyParser.json());
};
