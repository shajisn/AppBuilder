/**
 * Created by Jithu.jose on 3/7/2016.
 */


// <BEGIN FILE DESCRIPTION>
//  {
//    "description" : "/api/error/*  Used by frontend to log execution errors in AppGrid."
//  }
// <END FILE DESCRIPTION>
'use strict';

var path = require('path');
var api = require('express').Router();
var $q= require('q');
var configurationManager = require(path.resolve('backend/managers/configurationManager'));
var endpoint = '/api/configuration';
api.post('/getProjectConfiguration', function(req, res) {
    configurationManager.getProjectConfiguration(req.body).then(function(response){
        res.send(response);
    }).fail(function(err){
        res.send(err);
    });
});

api.post('/getPageConfiguration', function(req, res) {
    configurationManager.getPageConfiguration(req.body, function(err, pageConfiguration){
        if(err){
            res.send(err);
        }
        else{
            res.send(pageConfiguration);
        }
    });
});

api.post('/getConfig', function(req, res) {
    configurationManager.getConfig(req.body, function(err, config){
        if(err){
            res.send(err);
        }
        else{
            res.send(config);
        }
    });
});

module.exports = {
    router: api,
    endpoint: endpoint
};